
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Avatar, Stack } from '@mui/material'

const defaultImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png'

const ImageUpload = (props: any) => {
  const { formData, setFormData } = props
  const [selectedFile, setSelectedFile] = useState(null)

  const handleImageChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedFile(file)
        setFormData({
          ...formData,
          image: reader.result
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setSelectedFile(null)
    setFormData({
      ...formData,
      image: null
    })
  }

  return (
    <Stack direction={'row'} alignItems='center'>
      <Typography
        sx={{
          minWidth: { xs: '130px', sm: '180px' },
          fontWeight: 'bold',
          fontSize: { xs: 13, sm: 15 }
        }}
      >
        {'Thumbnail '}
        <span style={{ color: 'red' }}>*</span>
      </Typography>
      <div>
        <Avatar
          sx={{
            width: { xs: 160, sm: 250 },
            height: { xs: 110, sm: 150 }
          }}
          variant='rounded'
          src={formData.image || defaultImage}
        ></Avatar>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {selectedFile || formData.thumbnail || formData.image ? (
            <Button variant='contained' color='error' onClick={clearImage}>
              Remove Image
            </Button>
          ) : (
            <Button variant='contained' component='label' startIcon={<CloudUploadIcon />}>
              Upload Image
              <input
                name='image'
                style={{ display: 'none' }}
                type='file'
                onChange={handleImageChange}
                accept='image/*'
              />
            </Button>
          )}
        </div>
      </div>
    </Stack>
  )
}

export default ImageUpload
