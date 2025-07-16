'use client'

import React, { useActionState, useEffect } from 'react'
import Submit from '../Submit'
import { deleteProduct } from '@/actions/products'

export default function Delete({id}) {
  const [state,formData] = useActionState(deleteProduct,{})

  return (
    <form action={formData}>
      <input type="hidden" value={id} name='id' />
      <Submit title='حذف' style="btn btn-dark mt-4"/>
    </form>
  )
}
