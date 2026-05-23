# Implementation Plan: Parts Management Enhancement

## Overview

This implementation plan converts the design for Cloudinary image upload integration into the parts management system. The tasks focus on connecting existing infrastructure (Cloudinary config, upload controller, upload API service) with the MediaGalleryCard component in the admin part form. Each task builds incrementally, with testing integrated as sub-tasks.

## Tasks

- [x] 1. Set up MediaGalleryCard component structure and dependencies
  - Create `frontend/src/pages/Admin/PartForm/components/MediaGalleryCard/index.jsx` component file
  - Create `frontend/src/pages/Admin/PartForm/components/MediaGalleryCard/hooks/useMediaGallery.js` hook file
  - Install required dependencies: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` (if not already installed)
  - Import necessary Ant Design components (Card, Upload, Spin, Image, Button)
  - Import upload API service from `frontend/src/services/api/upload.api.js`
  - Import React Hook Form's `useController`
  - _Requirements: 1.1, 1.3, 3.1, 3.2, 5.1, 5.2, 6.1_

- [x] 2. Implement useMediaGallery hook for state management
  - [x] 2.1 Set up form field integration with React Hook Form
    - Use `useController` to connect to form's `images` field
    - Initialize `isUploading` state for upload progress tracking
    - Extract `field.value` (images array) and `field.onChange` (update function)
    - _Requirements: 6.1, 6.2, 6.4_

  - [x] 2.2 Implement handleUpload function for image upload
    - Extract files from Ant Design Upload component's `info` parameter
    - Set `isUploading` to true before upload
    - Call `uploadImages` API service with files array
    - On success, append returned Cloudinary URLs to existing images array
    - Update form field value using `field.onChange`
    - Display success message using Ant Design's `message.success`
    - On error, display error message using `message.error`
    - Set `isUploading` to false after completion
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 3.1, 3.2, 3.3, 3.4, 7.1, 7.2, 7.3_

  - [x] 2.3 Implement handleRemove function for image deletion
    - Accept image index as parameter
    - Create new array excluding the image at specified index
    - Update form field value with new array using `field.onChange`
    - _Requirements: 5.2, 5.4_

  - [x] 2.4 Implement handleDragEnd function for image reordering
    - Extract `active` and `over` indices from drag event
    - Use `arrayMove` utility from `@dnd-kit/utilities` to reorder array
    - Update form field value with reordered array using `field.onChange`
    - _Requirements: 5.1, 5.3_

  - [x] 2.5 Set up drag-and-drop sensors
    - Configure `useSensor` and `useSensors` from `@dnd-kit/core`
    - Add `PointerSensor` for mouse/touch interaction
    - Add `KeyboardSensor` for keyboard accessibility
    - Return sensors array for use in component
    - _Requirements: 5.1, 5.5_

  - [ ]* 2.6 Write unit tests for useMediaGallery hook
    - Test `handleUpload` calls upload API with correct files
    - Test successful upload updates form field value
    - Test upload error displays error message
    - Test `handleRemove` removes correct image from array
    - Test `handleDragEnd` reorders images correctly
    - Test `isUploading` state toggles during upload
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 5.1, 5.2_

- [x] 3. Create SortableImageItem component for drag-and-drop images
  - Create `frontend/src/pages/Admin/PartForm/components/MediaGalleryCard/SortableImageItem.jsx` file
  - Import `useSortable` from `@dnd-kit/sortable`
  - Import `CSS` transform utility from `@dnd-kit/utilities`
  - Implement component with props: `id`, `imgUrl`, `index`, `onRemove`, `t`
  - Use `useSortable` hook with `id` prop
  - Render Ant Design Image component with Cloudinary URL
  - Add drag handle icon for visual feedback
  - Add remove button with delete icon
  - Apply transform and transition styles from `useSortable`
  - Style component with responsive grid layout
  - _Requirements: 5.1, 5.2, 5.5_

- [x] 4. Implement MediaGalleryCard component UI
  - [x] 4.1 Set up component structure and props
    - Accept props: `control` (React Hook Form), `name` (field name), `t` (translation function)
    - Call `useMediaGallery` hook with control and name
    - Destructure returned values: `images`, `sensors`, `handleUpload`, `handleRemove`, `handleDragEnd`, `isUploading`
    - _Requirements: 6.1, 6.2_

  - [x] 4.2 Implement upload zone with Ant Design Dragger
    - Wrap component in Ant Design Card with title from translation
    - Add Ant Design Spin component for loading state (controlled by `isUploading`)
    - Render Ant Design Upload.Dragger component
    - Configure props: `multiple={true}`, `showUploadList={false}`, `beforeUpload={() => false}` (prevent auto-upload)
    - Set `onChange` handler to call `handleUpload`
    - Add upload icon and descriptive text (drag-drop instructions, file limit)
    - Disable dragger when `isUploading` is true
    - _Requirements: 1.1, 3.2, 3.5, 7.1_

  - [x] 4.3 Implement image gallery with drag-and-drop
    - Conditionally render gallery only when `images.length > 0`
    - Wrap gallery in `DndContext` from `@dnd-kit/core` with `sensors` and `onDragEnd={handleDragEnd}`
    - Use `SortableContext` from `@dnd-kit/sortable` with `items={images}` and horizontal strategy
    - Map over `images` array and render `SortableImageItem` for each image
    - Pass props: `key={url}`, `id={url}`, `imgUrl={url}`, `index={i}`, `onRemove={handleRemove}`, `t={t}`
    - Style gallery with responsive grid (2 columns mobile, 4 columns desktop)
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.5, 6.4_

  - [ ]* 4.4 Write unit tests for MediaGalleryCard component
    - Test component renders upload zone
    - Test component renders image grid when images exist
    - Test loading spinner shows when `isUploading` is true
    - Test drag-and-drop is disabled during upload
    - _Requirements: 3.5, 5.5, 7.1_

- [x] 5. Integrate MediaGalleryCard into PartForm
  - Open `frontend/src/pages/Admin/PartForm/index.jsx` (or equivalent form component)
  - Import MediaGalleryCard component
  - Add MediaGalleryCard to form JSX with props: `control={control}`, `name="images"`, `t={t}`
  - Ensure form's default values include `images: []`
  - Verify form submission includes `images` field in payload
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 6. Checkpoint - Test frontend image upload flow
  - Ensure all tests pass, ask the user if questions arise.
  - Manually test: Select images in MediaGalleryCard
  - Manually test: Verify loading spinner appears during upload
  - Manually test: Verify success message appears after upload
  - Manually test: Verify images display in gallery
  - Manually test: Verify drag-and-drop reordering works
  - Manually test: Verify remove button deletes images
  - Manually test: Verify form state updates correctly

- [x] 7. Verify backend upload endpoint configuration
  - Open `backend/routes/common/upload.route.js`
  - Verify route exists: `router.post('/images', protect, upload.array('images', 10), uploadImages)`
  - Verify `protect` middleware is imported and applied
  - Verify `upload` multer instance is imported from Cloudinary config
  - Verify `uploadImages` controller is imported
  - If route doesn't exist, add it following the pattern above
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 8. Verify upload controller implementation
  - Open `backend/controllers/common/upload.controller.js`
  - Verify `uploadImages` function exists
  - Verify function checks for `req.files` and returns 400 if empty
  - Verify function extracts Cloudinary URLs from `req.files[].path`
  - Verify function returns JSON response with `{ success: true, data: [urls], message: "..." }`
  - If function doesn't exist, implement it following the design specification
  - _Requirements: 1.2, 1.4, 2.5, 7.3, 7.4, 7.5_

- [x] 9. Verify Cloudinary configuration
  - Open `backend/config/cloudinary.js`
  - Verify Cloudinary credentials are configured (cloud_name, api_key, api_secret)
  - Verify CloudinaryStorage is configured with folder `carshop/uploads`
  - Verify allowed formats: `['jpg', 'png', 'jpeg', 'webp']`
  - Verify file size limit: 10MB
  - Verify public_id naming pattern includes timestamp and random suffix
  - _Requirements: 8.1, 8.5_

- [x] 10. Verify upload API service
  - Open `frontend/src/services/api/upload.api.js`
  - Verify `uploadImages` function exists
  - Verify function creates FormData and appends files with field name `images`
  - Verify function sends POST request to `/upload/images`
  - Verify function includes `Content-Type: multipart/form-data` header
  - Verify function returns `response.data.data` (array of URLs)
  - If function doesn't exist, implement it following the design specification
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ]* 11. Write integration tests for upload endpoint
  - Test POST `/api/v1/upload/images` with valid files returns URLs
  - Test POST `/api/v1/upload/images` without auth returns 401
  - Test POST `/api/v1/upload/images` without files returns 400
  - Test POST `/api/v1/upload/images` with oversized file returns 400
  - Test POST `/api/v1/upload/images` with invalid file type returns 400
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 7.3, 7.4, 7.5, 8.5_

- [ ] 12. Update Part model to ensure images field exists
  - Open `backend/models/partModel.js`
  - Verify `images` field exists with type `[String]` and default `[]`
  - Verify virtual field `image` returns first image or null
  - If fields don't exist, add them following the design specification
  - _Requirements: 1.4, 4.1, 4.2, 6.5_

- [~] 13. Verify Part controller handles images in CRUD operations
  - Open `backend/controllers/admin/part.controller.js`
  - Verify create part function accepts `images` array in request body
  - Verify update part function accepts `images` array in request body
  - Verify get part function returns `images` array in response
  - Ensure no special processing needed (images are just URL strings)
  - _Requirements: 1.4, 6.3, 6.5, 8.4_

- [ ]* 14. Write integration tests for Part CRUD with images
  - Test creating part with images array saves correctly
  - Test updating part images array updates correctly
  - Test retrieving part returns images array
  - Test part virtual field `image` returns first image
  - _Requirements: 1.4, 4.1, 6.3, 6.5_

- [~] 15. Implement client-side part detail page image display
  - Open client part detail page component (e.g., `frontend/src/pages/Customer/PartDetail/index.jsx`)
  - Verify component fetches part data including `images` array
  - Implement primary image display (first image in array)
  - Implement image gallery for additional images (if multiple exist)
  - Add placeholder image when `images` array is empty
  - Hide placeholder when images are available
  - Ensure images load from Cloudinary URLs directly
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 16. Write integration tests for client image display
  - Test part detail page displays primary image
  - Test part detail page displays image gallery for multiple images
  - Test part detail page displays placeholder when no images
  - Test images load from Cloudinary URLs
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [~] 17. Add translation keys for MediaGalleryCard
  - Open translation files (e.g., `frontend/src/locales/vi/adminPartForm.json` and `en/adminPartForm.json`)
  - Add Vietnamese translations:
    - `gallery`: "Thư viện ảnh"
    - `uploading`: "Đang tải ảnh..."
    - `dragDrop`: "Kéo thả ảnh vào đây"
    - `orClick`: "hoặc nhấp để chọn"
    - `uploadLimit`: "(Tối đa 10 ảnh)"
    - `dragToReorder`: "Kéo để sắp xếp lại"
    - `uploadSuccess`: "Tải ảnh lên thành công"
    - `uploadError`: "Lỗi tải ảnh lên"
  - Add English translations (fallback)
  - _Requirements: 7.1, 7.2, 7.3_

- [~] 18. Add error message translations
  - Add Vietnamese error messages:
    - `noFiles`: "Vui lòng chọn ít nhất 1 ảnh để tải lên"
    - `fileTooLarge`: "Kích thước file quá lớn (tối đa 10MB)"
    - `invalidType`: "Định dạng file không hợp lệ (chỉ chấp nhận jpg, png, jpeg, webp)"
  - Add English error messages (fallback)
  - Update upload controller to use translated messages
  - _Requirements: 7.3, 7.4, 7.5, 8.5_

- [~] 19. Final checkpoint - End-to-end testing
  - Ensure all tests pass, ask the user if questions arise.
  - **Admin workflow**:
    - Log in as admin
    - Navigate to create part form
    - Upload 3 images via MediaGalleryCard
    - Verify loading indicator appears
    - Verify success message appears
    - Reorder images via drag-and-drop
    - Remove 1 image
    - Submit form
    - Verify part saved with 2 images in correct order
  - **Client workflow**:
    - Navigate to part detail page
    - Verify primary image displays
    - Verify image gallery displays all images
    - Verify images load from Cloudinary
  - **Error handling**:
    - Test upload without authentication (should fail)
    - Test upload with oversized file (should show error)
    - Test upload with invalid file type (should show error)

- [~] 20. Documentation and cleanup
  - Add code comments to complex logic in useMediaGallery hook
  - Add JSDoc comments to component props
  - Update README or developer documentation with image upload feature
  - Remove any console.log statements used for debugging
  - Verify all imports are used and no unused variables exist
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

## Task Dependency Graph

```
1 → 2.1 → 2.2 → 2.3 → 2.4 → 2.5 → (2.6*) → 3 → 4.1 → 4.2 → 4.3 → (4.4*) → 5 → 6
7, 8, 9, 10 (parallel verification tasks)
(11*) (optional integration tests)
12 → 13 → (14*)
15 → (16*)
17, 18 (parallel translation tasks)
19 (final checkpoint - depends on all previous)
20 (documentation - depends on 19)
```

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints (tasks 6, 19) ensure incremental validation and provide opportunities to address issues
- The implementation leverages existing infrastructure (Cloudinary config, upload controller, upload API service) to minimize new code
- All image operations are non-destructive (removing images from array doesn't delete from Cloudinary)
- The feature follows patterns established in product and car modules for consistency
- Translation keys support both Vietnamese (primary) and English (fallback)
- Error handling provides clear feedback for all failure scenarios
- Accessibility is built-in via keyboard support in drag-and-drop and upload components
