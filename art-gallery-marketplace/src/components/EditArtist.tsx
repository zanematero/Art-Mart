import ArtistForm from "./forms/ArtistForm"
import useFetch from "./custom-hooks/useFetch"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import React from "react"

export default function EditArtist() {
  const params = useParams()

  const { get, put } = useFetch()

  const artistPlaceholder = {
    name: "",
    phone: "",
    email: "",
    image: "",
    style: "",
    bio: ""
  }

  const [artist, setArtist] = useState<Artist>(artistPlaceholder)

  useEffect(() => {
    (async () => {
      const data = await get(`/artists/${params.id}`)
      setArtist(data)
    })()
  }, [])
  
  const handleSubmit = e => {
    e.preventDefault()

    const { name, phone, email, image, style, bio } = e.target

    put(`/artists/${params.id}`, {
      name: name.value,
      phone: phone.value,
      email: email.value,
      image: image.value,
      style: style.value,
      bio: bio.value
    })
  }
  
  return <div>
    <h1>Update Your Profile</h1>
    { !artist.name
      ? <></>
      : <ArtistForm
        onSubmit={handleSubmit}
        formInputs={{
          name: artist.name,
          phone: artist.phone,
          email: artist.email,
          image: artist.image,
          style: artist.style,
          bio: artist.bio
        }}
      />}
  </div>
}