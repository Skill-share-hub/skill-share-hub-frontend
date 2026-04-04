import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import { fetchNotifications, markAsRead, markAllAsRead } from '../slice/notificationSlice';
import { CheckCircle2, AlertTriangle, XCircle, Info, CheckCheck, ChevronLeft, ChevronRight } from 'lucide-react';

const NotificationsPage = () => {
  const dispatch = useDispatch<any>();
  const { notifications, loading, unreadCount, pagination } = useSelector((state: RootState) => state.notifications);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(fetchNotifications({ page: currentPage, limit }));
  }, [dispatch, currentPage]);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'WARNING':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'ERROR':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-[80%] flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {loading && notifications.length === 0 ? (
        <div className="w-[80%] space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="w-[80%] bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <Info className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No notifications yet</h3>
          <p className="text-gray-500 mt-2">When you get notifications, they'll show up here.</p>
        </div>
      ) : (
        <>
          <div className="w-[80%] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`p-6 flex gap-4 transition-colors ${
                    !notification.isRead ? 'bg-green-50/20' : 'hover:bg-gray-50/50'
                  }`}
                >
                  <div className="mt-1 flex-shrink-0">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className={`text-base font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{notification.message}</p>
                    
                    {!notification.isRead && (
                      <div className="mt-4 flex items-center gap-4">
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1.5 transition-colors"
                        >
                          <CheckCheck className="w-4 h-4" />
                          Mark as read
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center gap-4 my-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
                disabled={currentPage === pagination.totalPages}
                className="p-2 border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationsPage;
