import { useNavigate } from '@tanstack/react-router';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { authSnackbarMessages } from 'src/constants'
import { supabase } from 'src/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';

const useLogout = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 
  const queryClient = useQueryClient();

  const { 
    isPending, 
    mutateAsync
  } = useMutation({    
    mutationFn: async() => {
      const { error } = await supabase.auth.signOut()

      if(error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
      navigate({to: '/signin'});
      enqueueSnackbar(authSnackbarMessages.success.logout, { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar(authSnackbarMessages.errors.logout, { variant: 'error' });
    },
  });

  return { mutateAsync, isLoading: isPending };
};

export default useLogout;