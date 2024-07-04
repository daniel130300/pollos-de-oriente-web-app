import * as yup from 'yup';
import { useState } from 'react';
import { comboFormsValidations, combosSnackbarMessages } from 'src/constants';
import useAddEntity from '../common/useAddEntity';
import { generateFilename } from 'src/utils';
import { supabase } from 'src/supabaseClient';
import { Combo } from './interface';

type AddCombo = Omit<Combo, 'id'>;

const useAddCombo = () => {
  const comboSchema = yup.object().shape({
    search_id: yup.string().required(comboFormsValidations.search_id.required),
    name: yup.string().required(comboFormsValidations.name.required),
    combo_image: yup
      .mixed()
      .test('fileType', comboFormsValidations.combo_image, (value: any) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .nullable(),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    formik.setFieldValue('combo_image', file);
  };

  const handleSubmit = () => {
    formik.setValues({ ...formik.values });
    formik.handleSubmit();
  };

  const mutationFn = async (values: AddCombo) => {
    if (values.combo_image) {
      const image_file_name = generateFilename(values.name, values.combo_image);

      const { data: image, error: imageError } = await supabase.storage
        .from('uploads')
        .upload(image_file_name, values.combo_image);

      if (imageError) {
        throw imageError;
      }

      values.bucket_id = 'uploads';
      values.file_name = image.path;
    }

    const { combo_image, ...rest } = values;

    const { data: comboData } = await supabase
      .from('combos')
      .insert([rest])
      .select()
      .throwOnError();

    return { comboData };
  };

  const { formik, isLoading } = useAddEntity<AddCombo>({
    initialValues: {
      name: '',
      combo_image: null,
      bucket_id: null,
      file_name: null,
      search_id: '',
    },
    validationSchema: comboSchema,
    onSuccessPath: '/combos',
    successMessage: combosSnackbarMessages.success.create,
    errorMessage: combosSnackbarMessages.errors.create,
    mutationFn,
  });

  return {
    formik,
    selectedFile,
    handleFileSelect,
    isLoading,
    handleSubmit,
  };
};

export default useAddCombo;
