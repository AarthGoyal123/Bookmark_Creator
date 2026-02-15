export const validateBookmark = (data) => {
    const errors = {};

    // URL Validation
    try {
        new URL(data.url);
    } catch (e) {
        errors.url = 'Invalid URL format';
    }
    if (!data.url) errors.url = 'URL is required';

    // Title Validation
    if (!data.title || data.title.trim().length === 0) {
        errors.title = 'Title is required';
    } else if (data.title.length > 200) {
        errors.title = 'Title must be 200 characters or less';
    }

    // Description Validation
    if (data.description && data.description.length > 500) {
        errors.description = 'Description must be 500 characters or less';
    }

    // Tags Validation
    if (data.tags) {
        if (!Array.isArray(data.tags)) {
            errors.tags = 'Tags must be an array';
        } else if (data.tags.length > 5) {
            errors.tags = 'Max 5 tags allowed';
        } else {
            const invalidTags = data.tags.filter(tag => tag !== tag.toLowerCase());
            if (invalidTags.length > 0) {
                errors.tags = 'Tags must be lowercase only';
            }
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};
