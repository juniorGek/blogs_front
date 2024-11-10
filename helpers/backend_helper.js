import { del, get, post, postFile, postForm } from "./api_helper"


export const verifyGoogleUser = data => post(`${process.env.backend_url}/api/user/verify-google-user`, data)

export const fetchUser = data => post(`${process.env.backend_url}/api/user/verify`, data)

export const postLogin = data => post(`${process.env.backend_url}/api/user/login`, data)
export const postSignup = data => post(`${process.env.backend_url}/api/user/register`, data)
export const signupOtpVerify = data => post(`${process.env.backend_url}/api/user/signup-otp-verify`, data)
export const signupResendOtp = data => post(`${process.env.backend_url}/api/user/signup-resend-otp`, data)

export const fetchUsers = data => get(`${process.env.backend_url}/api/user/list`, data)
export const postUser = data => post(`${process.env.backend_url}/api/user/update`, data)
export const updateUserByAdmin = data => post(`${process.env.backend_url}/api/user/update-by-admin`, data)

export const deleteUserAPI = data => del(`${process.env.backend_url}/api/user`, data)


export const fetchProfile = data => get(`${process.env.backend_url}/api/user/verify`, data)
export const fetchSubscriber = data => get(`${process.env.backend_url}/api/subscriber`, data)
export const postSubscribe = data => post(`${process.env.backend_url}/api/subscriber/subscribe`, data)
export const postUnSubscribe = data => post(`${process.env.backend_url}/api/subscriber/unsubscribe`, data)
export const PasswordResetByOtp = data => post(`${process.env.backend_url}/api/user/password-reset-by-otp`, data)
export const PasswordResetByOtpToken = data => post(`${process.env.backend_url}/api/user/password-reset-by-token`, data)
export const PasswordReset = data => post(`${process.env.backend_url}/api/user/verify-reset-otp`, data)
export const PasswordResetEmail = data => post(`${process.env.backend_url}/api/user/send-reset-otp`, data)
export const passwordUpdate = data => post(`${process.env.backend_url}/api/user/password-reset-by-token`, data)
export const userProfileUpdate = data => post(`${process.env.backend_url}/api/user/update`, data)

export const removeFile = data => post(`${process.env.backend_url}/api/file/remove-aws`, data)
export const uploadSingleFile = data => postForm(`${process.env.backend_url}/api/file/single-image-aws`, data)
export const uploadMultipleFile = data => postForm(`${process.env.backend_url}/api/file/multiple-image-aws`, data)
export const sendMultipleFile = data => post(`${process.env.backend_url}/api/file/multiple-image-aws`, data)

export const fetchSiteSettings = data => get(`${process.env.backend_url}/api/settings/site`, data)
export const getCategoryData = data => get(`${process.env.backend_url}/api/category/categories`, data)
export const getAllCategoryData = data => get(`${process.env.backend_url}/api/category/all`, data)
export const getCategoryDataSub = data => get(`${process.env.backend_url}/api/category/treecategory`, data)
export const getSigleCategory = data => get(`${process.env.backend_url}/api/category`, data)
export const postComments = data => post(`${process.env.backend_url}/api/comments`, data)
export const fetchComments = data => get(`${process.env.backend_url}/api/comments`, data)
export const delComment = data => del(`${process.env.backend_url}/api/comments`, data)
export const fetchCommentsListByAdmin = data => get(`${process.env.backend_url}/api/comments/list`, data)
export const getTags = data => get(`${process.env.backend_url}/api/tag/tags`, data)
export const getAllTags = data => get(`${process.env.backend_url}/api/tag/all`, data)

export const postCommentReply = (data) => post(`${process.env.backend_url}/api/comment-reply`,"", data);
export const fetchCommentReplyByAdmin = (data) => get(`${process.env.backend_url}/api/comment-reply/list`, data);
export const delCommentReply = (data) => del(`${process.env.backend_url}/api/comment-reply`, data);


export const fetchSubCategoriesByCategory = data => get(`${process.env.backend_url}/api/subcategory/subcategories`, data)
export const fetchAllSubCategoriesByCategory = data => get(`${process.env.backend_url}/api/subcategory/all`, data)
export const fetchSubCategory = data => get(`${process.env.backend_url}/api/subcategory`, data)
export const addSubCategories = data => post(`${process.env.backend_url}/api/subcategory`, data)
export const delSubCategories = data => del(`${process.env.backend_url}/api/subcategory`, data)


export const fetchCategories = data => get(`${process.env.backend_url}/api/category/categories`, data)
export const fetchBlogAll = data => get(`${process.env.backend_url}/blog/all`, data)
export const fetchAllVideoBlog = data => get(`${process.env.backend_url}/api/blog/all-video`, data)
export const postCategory = data => post(`${process.env.backend_url}/api/category`, data)
export const deleteCategory = data => del(`${process.env.backend_url}/api/category`, data)
export const deletePost = data => del(`${process.env.backend_url}/api/blog`, data)

export const postStoryTopic = data => post(`${process.env.backend_url}/api/story/topic`, data)
export const fetchStoryTopic = data => get(`${process.env.backend_url}/api/story/topic`, data)
export const fetchAllStoryTopic = data => get(`${process.env.backend_url}/api/story/topic/for-frontend`, data)
export const fetchStoryElement = data => get(`${process.env.backend_url}/api/story/topic/element`, data)
export const deleteStoryTopic = data => del(`${process.env.backend_url}/api/story/topic`, data)

export const postStory = data => post(`${process.env.backend_url}/api/story`, data)
export const fetchAllStory = data => get(`${process.env.backend_url}/api/story/all`, data)
export const fetchStoryForFrontend = data => get(`${process.env.backend_url}/api/story/for-frontend`, data)
export const fetchStory = data => get(`${process.env.backend_url}/api/story`, data)
export const deleteStory = data => del(`${process.env.backend_url}/api/story`, data)


export const fetchTags = data => get(`${process.env.backend_url}/api/tag/tags`, data)
export const deleteTag = data => del(`${process.env.backend_url}/api/tag`, data)
export const postTag = data => post(`${process.env.backend_url}/api/tag`, data)
`${process.env.backend_url}/api`

export const fetchContact = data => get(`${process.env.backend_url}/api/contact-us`, data)
export const deleteContact = data => del(`${process.env.backend_url}/api/contact-us`, data)

export const replyContactSms = data => post(`${process.env.backend_url}/api/contact-us/msg-reply`, data)

export const fetchAdminSettings = data => get(`${process.env.backend_url}/api/settings`, data)
export const postAdminSettings = data => post(`${process.env.backend_url}/api/settings`, data)
export const contactUs = data => post(`${process.env.backend_url}/api/contact-us`, data)
export const blogPublish = data => post(`${process.env.backend_url}/api/blog/publish`, data)
export const singleBlogDetails = data => get(`${process.env.backend_url}/api/blog/details`, data)


export const AddBlog = data => post(`${process.env.backend_url}/api/blog`, data)
export const blogPublished = data => get(`${process.env.backend_url}/api/blog/published`, data)
export const fetchPublishedForFrontend = data => get(`${process.env.backend_url}/api/blog/published-frontend`, data)
export const latestBlog = data => get(`${process.env.backend_url}/api/blog/latest`, data)
export const getSingleBlog = data => get(`${process.env.backend_url}/api/blog/details`, data)



export const fetchEdChoice = data => get(`${process.env.backend_url}/api/blog/editors-choice`, data)

export const getDashboardFront = data => get(`${process.env.backend_url}/api/dashboard/dashboard-frontend`, data)

export const fetchCtwData = data => get(`${process.env.backend_url}/api/blog/for-frontend`, data)
export const fetchVideo = data => get(`${process.env.backend_url}/api/blog/featured-video`, data)

export const fetchAllLanguages = data => get(`${process.env.backend_url}/api/language/all`, data)
export const postLanguage = data => post(`${process.env.backend_url}/api/language`, data)
export const delLanguage = data => del(`${process.env.backend_url}/api/language`, data)

export const fetchTranslations = data => get(`${process.env.backend_url}/api/language/translations`, data)
export const postTranslations = data => post(`${process.env.backend_url}/api/language/translations`, data)

export const fetchImages = data => get(`${process.env.backend_url}/api/gallery/images`, data)
export const postImages = data => post(`${process.env.backend_url}/api/gallery/image`, data)
export const delImage = data => del(`${process.env.backend_url}/api/gallery/image`, data)


//HRM module

// department
export const postDepartment = data => post(`${process.env.backend_url}/api/department`, data);
export const fetchDepartmentList = data => get(`${process.env.backend_url}/api/department/list`, data);
export const fetchDepartmentShortList = data => get(`${process.env.backend_url}/api/department/elements`, data);
export const fetchDepartment = data => get(`${process.env.backend_url}/api/department`, data);
export const delDepartment = data => del(`${process.env.backend_url}/api/department`, data);

// role permissions api

export const postEmployee = data => post(`${process.env.backend_url}/api/user/employee-create`, data);
export const fetchEmployee = data => get(`${process.env.backend_url}/api/user/employee-list`, data);
export const fetchEmployeeDepartment = data => get(`${process.env.backend_url}/api/user/employee/roles`, data);

export const postPermissions = data => post(`${process.env.backend_url}/api/role/permissions`, data);
export const fetchPermissions = data => get(`${process.env.backend_url}/api/role/permissions`, data);

export const fetchRoles = data => get(`${process.env.backend_url}/api/role/list`, data);
export const fetchDepartmentOrCategoryWise = data => get(`${process.env.backend_url}/api/role/department-wise-list`, data);
export const fetchRole = data => get(`${process.env.backend_url}/api/role`, data);
export const postRole = data => post(`${process.env.backend_url}/api/role`, data);
export const delRole = data => del(`${process.env.backend_url}/api/role`, data);



// fetch question ==============================
export const fetchForumQuestions = data => get(`${process.env.backend_url}/api/question`, data);
export const fetchQuestionDetails = data => get(`${process.env.backend_url}/api/question/details`, data);
export const postQuestion = data => post(`${process.env.backend_url}/api/question`, data);

// fetch answer ==============================
export const fetchAnswers = data => get(`${process.env.backend_url}/api/answer`, data);
export const FetchAnswerDetails = data => get(`${process.env.backend_url}/api/answer/details`, data);
export const postAnswer = data => post(`${process.env.backend_url}/api/answer`, data);
export const delAnswer = data => del('/answer', data);

export const upVoteQuestion = data => post(`${process.env.backend_url}/api/question/upvote`, data);
export const DownVoteQuestion = data => post(`${process.env.backend_url}/api/question/downvote`, data);
export const upVoteAnswer = data => post(`${process.env.backend_url}/api/answer/upvote`, data);
export const downVoteAnswer = data => post(`${process.env.backend_url}/api/answer/downvote`, data);
export const delQuestion = data => del(`${process.env.backend_url}/api/question`, data);

//fetch comments of answer
export const fetchAnswerComments = data => get(`${process.env.backend_url}/api/comments/answer`, data);
export const postAnswerComments = data => post(`${process.env.backend_url}/api/comments/answer`, data);
export const delAnswerComments = data => del(`${process.env.backend_url}/api/comments/answer`, data);
export const postCommentReplyAnswer = data => post(`${process.env.backend_url}/api/comment-reply/answer`, data);
export const fetchCommentReply = data => get(`${process.env.backend_url}/api/comment-reply`, data);


// fetch poll
export const fetchPoll = data => get(`${process.env.backend_url}/api/poll`, data);
export const postPoll = data => post(`${process.env.backend_url}/api/poll`, data);
export const delPoll = data => del(`${process.env.backend_url}/api/poll`, data);
export const postPollVote = data => post(`${process.env.backend_url}/api/poll/vote`, data);
export const postQuesPollVote = data => post(`${process.env.backend_url}/api/question/vote`, data);
