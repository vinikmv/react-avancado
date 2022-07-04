import {
  CheckCircleOutline,
  Email,
  ErrorOutline
} from '@styled-icons/material-outlined'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Button from 'components/Button'
import {
  FormError,
  FormLoading,
  FormSuccess,
  FormWrapper
} from 'components/Form'
import TextField from 'components/TextField'

import { FieldErrors, forgotValidate } from 'utils/validations'
import { valueFromASTUntyped } from 'graphql'

const FormForgotPassword = () => {
  const { query } = useRouter()
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [values, setValues] = useState({ email: (query.email as string) || '' })
  const [loading, setLoading] = useState(false)

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true)
    event.preventDefault()

    const errors = forgotValidate(values)

    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      setLoading(false)
      return
    }

    setFieldErrors({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(valueFromASTUntyped)
      }
    )

    const data = await response.json()
    setLoading(false)

    if (data.error) {
      setFormError(data.message[0].messages[0].message)
    } else {
      setSuccess(true)
    }
  }

  return (
    <FormWrapper>
      {success ? (
        <FormSuccess>
          <CheckCircleOutline /> You just received and email
        </FormSuccess>
      ) : (
        <>
          {!!formError && (
            <FormError>
              <ErrorOutline />
              <span>{formError}</span>
            </FormError>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              placeholder="Email"
              type="text"
              initialValue={query.email as string}
              error={fieldErrors.email}
              onInputChange={(v) => handleInput('email', v)}
              icon={<Email />}
            />

            <Button type="submit" size="large" fullWidth disabled={loading}>
              {loading ? <FormLoading /> : <span> Send email</span>}
            </Button>
          </form>
        </>
      )}
    </FormWrapper>
  )
}

export default FormForgotPassword
