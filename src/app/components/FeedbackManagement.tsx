import { Star, ThumbsUp, MessageSquare } from "lucide-react";

const feedbacks = [
  {
    id: 1,
    user: "Linda M",
    userEmail: "linda.m@email.com",
    rating: 5,
    comment: "We were very fortunate to have experienced driver Hiran take us around Sri Lanka. We felt safe and comfortable from airport pickup.",
    bookingId: "BK-10234",
    date: "2026-02-15",
    helpful: 28
  },
  {
    id: 2,
    user: "Diana Iacob",
    rating: 5,
    userEmail: "diana.iacob@email.com",
    comment: "Hiran was an extraordinary driver who traveled with us on all excursions and always ensured our safety.",
    bookingId: "BK-10235",
    date: "2026-02-10",
    helpful: 24
  },
  {
    id: 3,
    user: "L M",
    rating: 5,
    userEmail: "l.m@email.com",
    comment: "Hiran is a fantastic guide and friendly person who always goes the extra mile to provide the best travel experience.",
    bookingId: "BK-10236",
    date: "2026-01-28",
    helpful: 31
  },
  {
    id: 4,
    user: "Sarah Johnson",
    rating: 5,
    userEmail: "sarah.j@email.com",
    comment: "Excellent service! The Sigiriya tour was perfectly organized. Our driver was punctual, professional, and very knowledgeable about the history and culture.",
    bookingId: "BK-10237",
    date: "2026-01-22",
    helpful: 19
  },
  {
    id: 5,
    user: "Michael Brown",
    rating: 5,
    userEmail: "michael.b@email.com",
    comment: "Amazing experience! The Grand Hill and Coastal Journey exceeded our expectations. Every destination was beautiful and well-planned.",
    bookingId: "BK-10238",
    date: "2026-01-15",
    helpful: 22
  },
  {
    id: 6,
    user: "Emma Wilson",
    rating: 4,
    userEmail: "emma.w@email.com",
    comment: "Great tour of Ella and the tea plantations. The Nine Arch Bridge was spectacular. Would recommend TravelRa to anyone visiting Sri Lanka.",
    bookingId: "BK-10239",
    date: "2026-01-08",
    helpful: 15
  },
  {
    id: 7,
    user: "Robert Taylor",
    rating: 5,
    userEmail: "r.taylor@email.com",
    comment: "Professional service from start to finish. The KDH van was clean and comfortable for our family of 6. Highly recommended!",
    bookingId: "BK-10240",
    date: "2025-12-20",
    helpful: 17
  },
  {
    id: 8,
    user: "Jennifer Martinez",
    rating: 5,
    userEmail: "j.martinez@email.com",
    comment: "Fantastic Kandy city tour! The Temple of the Tooth was incredible. Our guide was very informative and made the experience memorable.",
    bookingId: "BK-10241",
    date: "2025-12-12",
    helpful: 13
  },
];

export function FeedbackManagement() {
  const averageRating = (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1);
  const totalReviews = feedbacks.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: feedbacks.filter(f => f.rating === rating).length,
    percentage: (feedbacks.filter(f => f.rating === rating).length / totalReviews * 100).toFixed(0)
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl text-gray-900 mb-2">Feedback Management</h1>
        <p className="text-gray-600">Monitor and respond to customer reviews</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Average Rating</span>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-4xl text-gray-900">{averageRating}</p>
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(parseFloat(averageRating))
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-2">Based on {totalReviews} reviews</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Total Reviews</span>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-4xl text-gray-900">{totalReviews}</p>
          <p className="text-xs text-green-600 mt-2">+5 this week</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Positive Reviews</span>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-4xl text-gray-900">
            {feedbacks.filter(f => f.rating >= 4).length}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {((feedbacks.filter(f => f.rating >= 4).length / totalReviews) * 100).toFixed(0)}% of total
          </p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg text-gray-900 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {ratingDistribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm text-gray-700">{item.rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0F62FE] h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-600 w-16 text-right">
                {item.count} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg text-gray-900">Customer Reviews</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0F62FE] rounded-full flex items-center justify-center text-white">
                    {feedback.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{feedback.user}</p>
                    <p className="text-xs text-gray-500">{feedback.userEmail}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= feedback.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">• {feedback.date}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-500">Booking: {feedback.bookingId}</span>
              </div>
              <p className="text-sm text-gray-700 mb-3 ml-16">{feedback.comment}</p>
              <div className="flex items-center gap-4 ml-16">
                <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#0F62FE]">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({feedback.helpful})
                </button>
                <button className="text-sm text-[#0F62FE] hover:underline">Reply</button>
                <button className="text-sm text-gray-600 hover:underline">Approve</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{feedbacks.length}</span> reviews
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Previous
          </button>
          <button className="px-4 py-2 text-sm bg-[#0F62FE] text-white rounded-lg hover:bg-[#0F62FE]/90">
            1
          </button>
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
