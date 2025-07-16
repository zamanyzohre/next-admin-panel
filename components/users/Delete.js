'use client'

import { useActionState } from "react";
import Submit from "../Submit";
import { deleteUser } from "@/actions/users";

export default function Delete({id}) {
const [state,formaction] = useActionState(deleteUser,{})

  return (
    <form action={formaction}>
      <input type="hidden" name="id" value={id} />
      <Submit title="حذف" style="btn btn-dark mt-4"/>
    </form>
  )
}
