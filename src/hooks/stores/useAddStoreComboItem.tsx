import { Dispatch } from 'react';
import * as yup from 'yup';
import { comboFormsValidations } from 'src/constants';
import { useFormik } from 'formik';
import { EditableStoreCombo } from './interface';
import useGetCombos from '../combos/useGetCombos';

const useAddStoreComboItem = ({
  combosList,
  setCombos,
}: {
  combosList: EditableStoreCombo[];
  setCombos: Dispatch<React.SetStateAction<EditableStoreCombo[]>>;
}) => {
  const {
    search,
    setSearch,
    combos: autoCompleteItems,
    combosIsLoading: autoCompleteItemsLoading,
  } = useGetCombos();

  const comboSchema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    sale_price: yup
      .number()
      .typeError(comboFormsValidations.sale_price.typeError)
      .required(comboFormsValidations.sale_price.required)
      .min(1, comboFormsValidations.sale_price.min(1)),
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      sale_price: '',
      editable: false,
    },
    validationSchema: comboSchema,
    onSubmit: async values => {
      const { id, sale_price } = values;
      const existingComboIndex = combosList.findIndex(
        product => product.id === id,
      );

      if (existingComboIndex !== -1) {
        const updatedCombos = [...combosList];
        updatedCombos[existingComboIndex].sale_price += sale_price;
        setCombos(updatedCombos);
      } else {
        setCombos(previousCombos => [...previousCombos, values]);
      }
      setSearch('');
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const itemSelectError = !!formik.errors.id && !!formik.errors.name;

  return {
    search,
    setSearch,
    autoCompleteItems,
    autoCompleteItemsLoading,
    formik,
    itemSelectError,
  };
};

export default useAddStoreComboItem;
