'use client'

import { useActionState } from 'react'
import Submit from '../Submit'
import { deleteCoupons } from '@/actions/coupons'

export default function Delete({id}) {
  const [state,formData] = useActionState(deleteCoupons,{})

  return (
    <form action={formData}>
      <input type="hidden" value={id} name='id' />
      <Submit title='حذف' style="btn btn-dark mt-4"/>
    </form>
  )
}
