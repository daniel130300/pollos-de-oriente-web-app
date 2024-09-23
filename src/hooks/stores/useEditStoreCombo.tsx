import { comboFormsValidations } from 'src/constants/formValidations';
import * as yup from 'yup';
import { Dispatch, useEffect } from 'react';
import { useFormik } from 'formik';
import { EditableStoreCombo } from './interface';
import useGetCombos from '../combos/useGetCombos';

const useEditStoreCombo = ({
  index,
  combosList,
  combo,
  setCombos,
}: {
  index: number;
  combosList: EditableStoreCombo[];
  combo: EditableStoreCombo;
  setCombos: Dispatch<React.SetStateAction<EditableStoreCombo[]>>;
}) => {
  const {
    combos: autoCompleteItems,
    combosIsLoading: autoCompleteItemsLoading,
    search,
    setSearch,
  } = useGetCombos();

  useEffect(() => {
    setSearch(combo.name);
  }, [combo]);

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
    onSubmit: values => {
      const { id, name, sale_price } = values;
      const idExists =
        combosList.filter((combo, idx) => idx !== index && combo.id === id)
          .length > 0;
      let indexToRemove = -1;

      if (idExists) {
        const updatedCombos = combosList.map(combo => {
          if (combo.id === id) {
            indexToRemove = index;
            return {
              ...combo,
              name,
              sale_price,
              editable: false,
            };
          } else {
            return combo;
          }
        });
        if (indexToRemove !== -1) updatedCombos.splice(indexToRemove, 1);
        setCombos(updatedCombos);
      } else {
        const updatedCombos = combosList.map((combo, idx) => {
          if (idx === index) {
            return {
              ...combo,
              id,
              name,
              sale_price,
              editable: false,
            };
          } else {
            return combo;
          }
        });
        setCombos(updatedCombos);
      }
      setSearch('');
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const itemSelectError = !!formik.errors.id && !!formik.errors.name;

  const handleDeleteItem = (comboId: string) => {
    const filteredCombos = combosList.filter(combo => combo.id !== comboId);
    setCombos(filteredCombos);
  };

  const toggleItemEditable = (comboId: string) => {
    const updatedCombos = combosList.map(combo =>
      combo.id === comboId
        ? { ...combo, editable: !combo.editable }
        : { ...combo, editable: false },
    );
    setCombos(updatedCombos);
    if (!combosList.find(combo => combo.id === comboId)?.editable) {
      const comboToEdit = combosList.find(combo => combo.id === comboId);
      if (comboToEdit) {
        formik.setValues({
          id: comboToEdit.id,
          name: comboToEdit.name,
          sale_price: comboToEdit.sale_price,
          editable: true,
        });
        setSearch(comboToEdit.name);
      }
    }
  };

  return {
    search,
    setSearch,
    autoCompleteItems,
    autoCompleteItemsLoading,
    handleDeleteItem,
    toggleItemEditable,
    formik,
    itemSelectError,
  };
};

export default useEditStoreCombo;
