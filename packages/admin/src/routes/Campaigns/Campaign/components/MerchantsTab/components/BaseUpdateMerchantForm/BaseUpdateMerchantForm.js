import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'lodash'
import { useForm, FormProvider } from 'react-hook-form'

import { Text, VStack, HStack, Button } from '@chakra-ui/react'
import FormInput from 'components/FormInput'
import styles from './BaseUpdateMerchantForm.module.scss'

export default function BaseUpdateMerchantForm({
  uneditableFields,
  formFields,
  merchant,
  onPrimaryClick,
  isPrimaryLoading,
  children,
}) {
  // NOTE: docs for react-hook-forms are here https://react-hook-form.com/get-started#IntegratingwithUIlibraries
  // The hook manages state through the use of a controller (for a controlled component);
  // when the handleSubmit function is called, the wrapped function gets passed all the values of the form
  // as a single object with keys as the name prop of the controller
  const formMethods = useForm()
  const { handleSubmit, reset } = formMethods
  const onSubmit = (data) =>
    onPrimaryClick(_.mapValues(data, (value) => value || null))
  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.BaseUpdateMerchantFormContainer}
      >
        <VStack
          align="stretch"
          maxWidth="42.5rem"
          paddingY="40px"
          spacing="40px"
        >
          {_.map(uneditableFields, ({ key, display, value }) => (
            <div className="input-group" key={key}>
              <label htmlFor={key}>{display}</label>
              <p id={key}>{value(merchant)}</p>
            </div>
          ))}
          {_.map(formFields, (section) => (
            <VStack align="stretch" spacing="24px">
              <Text textStyle="h4" color="primary.500">
                {section.label}
              </Text>
              <VStack align="stretch" spacing="32px">
                {_.map(
                  section.fields,
                  ({
                    id,
                    display,
                    maxLength,
                    type,
                    required,
                    isInputValid,
                    defaultValue,
                  }) => (
                    <FormInput
                      label={display}
                      name={id}
                      defaultValue={defaultValue(merchant)}
                      registerOptions={{
                        required,
                      }}
                      inputProps={{
                        maxLength,
                        type,
                      }}
                      isInputValid={isInputValid}
                    />
                  )
                )}
              </VStack>
            </VStack>
          ))}
          {children}
          <HStack spacing="24px">
            <Button
              colorScheme="primary"
              isLoading={isPrimaryLoading}
              type="submit"
              variant="solid"
            >
              Save
            </Button>
            <Button
              colorScheme="primary"
              onClick={() => reset()}
              variant="link"
            >
              Cancel changes
            </Button>
          </HStack>
        </VStack>
      </form>
    </FormProvider>
  )
}

BaseUpdateMerchantForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  merchant: PropTypes.objectOf(PropTypes.any).isRequired,
  formFields: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
      maxLength: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
      defaultValue: PropTypes.func.isRequired,
    })
  ).isRequired,
  uneditableFields: PropTypes.objectOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
      value: PropTypes.func.isRequired,
    })
  ),
  onPrimaryClick: PropTypes.func.isRequired,
  isPrimaryLoading: PropTypes.bool.isRequired,
  children: PropTypes.node,
}
