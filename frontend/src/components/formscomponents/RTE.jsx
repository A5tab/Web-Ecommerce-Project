import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'
import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';


export default function RTE({ name = "content", control, label, defaultValue = "" }) {
  const [apiKey, setApiKey] = useState('');
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchRTE_API_KEY = async () => {
      try {
        const response = await axiosPrivate.get('/config/get_api_keys');
        if (response.status === 200) {
          setApiKey(response.data.data.RTE_API_KEY);
        }
      } catch (error) {
        console.error("Failed to fetch TinyMCE API key:", error);
      }
    }
    fetchRTE_API_KEY()
  }, [])

  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      {apiKey ? (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={apiKey}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              }}
              onEditorChange={onChange}
            />
          )}
        />) : (
        <p>Loading Editor...</p> // ✅ Prevents initial render with "no-api-key"
      )}

    </div>
  )
}

