# Requirements Document: Parts Management Enhancement

## Introduction

This document specifies the requirements for enhancing the parts management system with Cloudinary image upload functionality. The system currently lacks image upload capabilities in the admin part form, while other modules (products, cars) already have this feature implemented. This enhancement will bring feature parity and ensure a consistent user experience across all admin management interfaces.

## Glossary

- **Part**: A vehicle component or accessory managed in the system with properties including name, SKU, category, price, and images
- **Admin_Part_Form**: The administrative interface for creating and editing parts
- **MediaGalleryCard**: The React component responsible for displaying and managing part images in the admin form
- **Cloudinary**: The cloud-based image hosting and management service used by the system
- **Upload_Controller**: The backend controller that handles image upload requests to Cloudinary
- **Part_Controller**: The backend controller that manages CRUD operations for parts
- **Image_Array**: The array of Cloudinary URLs stored in the Part model's `images` field

## Requirements

### Requirement 1: Cloudinary Image Upload Integration

**User Story:** As an admin user, I want to upload part images to Cloudinary through the MediaGalleryCard component, so that I can store and display high-quality images for parts.

#### Acceptance Criteria

1. WHEN an admin uploads images through the MediaGalleryCard component, THE System SHALL send the images to the Cloudinary upload endpoint
2. WHEN the upload is successful, THE System SHALL return an array of Cloudinary URLs
3. WHEN Cloudinary URLs are returned, THE MediaGalleryCard SHALL update the form state with the new image URLs
4. WHEN images are uploaded, THE System SHALL store the Cloudinary URLs in the Part model's `images` array field
5. WHEN an upload fails, THE System SHALL display an error message to the admin user

### Requirement 2: Backend API Route Configuration

**User Story:** As a system, I want to have properly configured API routes for part image uploads, so that the frontend can communicate with the upload service.

#### Acceptance Criteria

1. THE System SHALL provide a POST endpoint at `/api/v1/upload/images` that accepts multipart form data
2. THE Upload_Endpoint SHALL accept up to 10 images in a single request and process all 10 images when provided
3. THE Upload_Endpoint SHALL require authentication via the protect middleware
4. THE Upload_Endpoint SHALL use the Cloudinary multer configuration for file handling
5. THE Upload_Endpoint SHALL return a JSON response with an array of uploaded image URLs

### Requirement 3: Frontend Upload Service Integration

**User Story:** As the MediaGalleryCard component, I want to use the existing upload API service, so that I can send images to the backend consistently.

#### Acceptance Criteria

1. THE MediaGalleryCard SHALL use the `uploadImages` function from the upload API service
2. WHEN uploading images, THE MediaGalleryCard SHALL create a FormData object with the selected files
3. WHEN the upload request is sent, THE System SHALL include authentication headers
4. WHEN the upload completes, THE MediaGalleryCard SHALL receive an array of Cloudinary URLs
5. WHEN the upload is in progress, THE MediaGalleryCard SHALL display a loading indicator and allow concurrent uploads with separate indicators

### Requirement 4: Image Display in Client Interface

**User Story:** As a customer, I want to see part images from Cloudinary on the product detail page, so that I can view high-quality images of the parts.

#### Acceptance Criteria

1. WHEN a customer views a part detail page, THE System SHALL retrieve the part's image array from the database
2. WHEN the part has images, THE System SHALL display the first image as the primary image
3. WHEN the part has multiple images, THE System SHALL display all images in a gallery format
4. THE System SHALL serve images directly from Cloudinary URLs without additional processing
5. WHEN a part has no images, THE System SHALL display a placeholder image, and hide the placeholder when any images are available

### Requirement 5: Image Management in Admin Interface

**User Story:** As an admin user, I want to reorder and remove part images in the MediaGalleryCard, so that I can control the image presentation order and remove unwanted images.

#### Acceptance Criteria

1. WHEN an admin drags an image to a new position, THE MediaGalleryCard SHALL update the image order in the form state
2. WHEN an admin clicks the remove button on an image, THE MediaGalleryCard SHALL remove that image from the form state
3. WHEN images are reordered, THE System SHALL preserve the new order when saving the part
4. WHEN an image is removed, THE System SHALL not delete it from Cloudinary but only remove the URL from the Part model
5. THE MediaGalleryCard SHALL display images in a responsive grid layout with drag-and-drop functionality

### Requirement 6: Form State Synchronization

**User Story:** As the admin part form, I want to synchronize image data between the MediaGalleryCard and the form controller, so that image changes are properly saved when the form is submitted.

#### Acceptance Criteria

1. THE MediaGalleryCard SHALL use React Hook Form's `useController` to manage the images field
2. WHEN images are uploaded, THE MediaGalleryCard SHALL update the form field value immediately
3. WHEN the form is submitted, THE System SHALL include the current image array in the request payload
4. WHEN editing an existing part, THE MediaGalleryCard SHALL initialize with the part's existing images
5. THE System SHALL validate that the images field contains an array of valid URL strings

### Requirement 7: Error Handling and User Feedback

**User Story:** As an admin user, I want to receive clear feedback about upload status and errors, so that I understand what is happening during the upload process.

#### Acceptance Criteria

1. WHEN an upload starts, THE MediaGalleryCard SHALL display a loading spinner with a progress message
2. WHEN an upload succeeds, THE System SHALL display a success message using Ant Design's message component
3. WHEN an upload fails due to network error, THE System SHALL display an error message with the failure reason
4. WHEN an upload fails due to file size limit, THE System SHALL display a specific error message about the size limit
5. WHEN an upload fails due to invalid file type, THE System SHALL display a specific error message about allowed file types

### Requirement 8: Consistency with Existing Modules

**User Story:** As a system architect, I want the parts image upload implementation to match the patterns used in products and cars modules, so that the codebase remains consistent and maintainable.

#### Acceptance Criteria

1. THE Part_Upload_Implementation SHALL use the same Cloudinary configuration as products and cars
2. THE Part_Upload_Implementation SHALL use the same upload controller endpoints as products and cars
3. THE MediaGalleryCard SHALL follow the same component structure and patterns as product/car image galleries
4. THE Part_Controller SHALL handle image URLs in the same way as the Product_Controller
5. THE System SHALL apply the same file size limits (10MB) and allowed formats (jpg, png, jpeg, webp) as other modules
