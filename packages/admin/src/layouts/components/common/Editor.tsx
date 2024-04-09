import React from 'react'
import { Box } from '@mui/material'

const Editor = (props: any) => {
  const { formData, setFormData } = props

  const handleEditorDataChange = (event: any, editor: any) => {
    console.log(event)
    const data = editor.getData()
    console.log(data)
    setFormData({
      ...formData,
      description: data
    })
  }

  return (
    <Box sx={{ width: { sm: '100%', xs: '100%' } }} style={{ margin: 'auto' }}>

      {/* <div>
        <h3>Editor Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: formData?.description }} />
      </div> */}
    </Box>
  )
}

export default Editor
