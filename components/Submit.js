'use client'

import { useFormStatus } from "react-dom"

export default function Submit({title,style}) {

  const {pending} = useFormStatus()

  return (
    <>
        <button type="submit" className={style}>
          {title}
          {pending && <div className="spinner-border spinner-border-sm me-2"></div> }
        </button>
        

    </>
  )
}
