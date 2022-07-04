import { Email, ErrorOutline, Lock } from '@styled-icons/material-outlined'
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Button from 'components/Button'
import { FormError, FormLoading, FormWrapper } from 'components/Form'
import TextField from 'components/TextField'

import { FieldErrors, resetValidate } from 'utils/validations'

const FormResetPassword = () => {
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [values, setValues] = useState({ password: '', confirm_password: '' })
  const [loading, setLoading] = useState(false)
  const { query } = useRouter()

  const handleInput = (field: string, value: string) => {
    setValues((s) => ({ ...s, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true)
    event.preventDefault()

    const errors = resetValidate(values)

    if (Object.keys(errors).length) {
      setFieldErrors(errors)
      setLoading(false)
      return
    }

    setFieldErrors({})

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: values.password,
          passwordConfirmation: values.confirm_password,
          code: query.code
        })
      }
    )

    const data = await response.json()

    if (data.error) {
      setFormError(data.message[0].message[0].message)
      setLoading(false)
    } else {
      signIn('credentials', {
        email: data.email,
        password: values.password,
        callbackUrl: '/'
      })
    }
  }

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline />
          <span>{formError}</span>
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          error={fieldErrors?.password}
          onInputChange={(v) => handleInput('password', v)}
          icon={<Lock />}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          type="password"
          error={fieldErrors?.confirm_password}
          onInputChange={(v) => handleInput('confirm_password', v)}
          icon={<Lock />}
        />

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span> Reset password</span>}
        </Button>
      </form>
    </FormWrapper>
  )
}

export default FormResetPassword
