"use client"

import { useId, useState } from "react"

export function Y2kGuestbookForm() {
  const signatureId = useId()
  const [signed, setSigned] = useState(false)

  return (
    <form
      className="y2k-sign"
      data-quiet-click=""
      onSubmit={(event) => {
        event.preventDefault()
        setSigned(true)
      }}
    >
      <label htmlFor={signatureId}>Your fictional signature</label>
      <input id={signatureId} name="signature" autoComplete="off" maxLength={80} placeholder="a raccoon" />
      <button className="y2k-ugly" type="submit">
        Sign the fictional guestbook
      </button>
      <p className="y2k-aside">This box does not send. It is part of the bit.</p>
      {signed ? (
        <p className="y2k-stamp" role="status">
          Stamped in marker, then thrown out. Nothing was saved.
        </p>
      ) : null}
    </form>
  )
}
