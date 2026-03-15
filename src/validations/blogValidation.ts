import * as Yup from 'yup'

export const blogValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be at most 200 characters'),
  content: Yup.string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters'),
  excerpt: Yup.string()
    .required('Excerpt is required')
    .max(300, 'Excerpt must be at most 300 characters'),
  tags: Yup.array().of(Yup.string()).nullable(),
})
