import Grid from '@mui/material/Grid';
import ReturnButton, { ReturnButtonProps } from '../molecules/ReturnButton';
import Typography from '@mui/material/Typography';

interface DetailsTemplateProps {
  title: string;
  children: React.ReactNode;
  returnButtonProps: ReturnButtonProps;
}

export const DetailsTemplate: React.FC<DetailsTemplateProps> = ({
  title,
  returnButtonProps,
  children,
}) => {
  const { to, params, ...rest } = returnButtonProps;

  return (
    <Grid container sx={{ position: 'relative' }}>
      <Grid item xs={10} sm={8} md={8} mx="auto">
        <ReturnButton
          to={returnButtonProps.to}
          params={returnButtonProps.params}
          {...rest}
        />
        <Typography variant="h1" mb={4}>
          {title}
        </Typography>
        <Typography variant="h3" mb={4}>
          Información General
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default DetailsTemplate;
