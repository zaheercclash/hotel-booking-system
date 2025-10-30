import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true && !(_id in path("drafts.**"))][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage
}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom" && !(_id in path("drafts.**"))] {
    _id, 
    coverImage,
    description,
    dimension,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getRoom = groq`*[_type == "hotelRoom" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    coverImage,
    description,
    dimension,
    discount,
    images,
    isBooked,
    isFeatured,
    name,
    numberOfBeds,
    offeredAmenities,
    price,
    slug,
    specialNote,
    type
}`;

// ✅ FIXED: Complete booking query with all necessary fields
export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId] {
    _id,
    _createdAt,
    _updatedAt,
    user -> {
        _id,
        name,
        email
    },
    hotelRoom -> {
        _id,
        name,
        slug,
        type,
        price,
        discount,
        description,
        coverImage,
        images[]{
            url,
            alt
        }
    },
    checkinDate,
    checkoutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount,
    status,
    bookingDate
} | order(_createdAt desc)`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image
}`;

// If you need to handle draft documents specifically:
export const getUserDataWithDraftsQuery = groq`*[_type == 'user' && (_id == $userId || _id == $draftId)][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image
}`;

export const getRoomReviewsQuery = groq`*[_type == "review" && hotelRoom._ref == $roomId && !(_id in path("drafts.**"))] {
    _createdAt,
    _id,
    text,
    user -> {
        name
    },
    userRating
}`;
