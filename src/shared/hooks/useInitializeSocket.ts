import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socket';
import type { RootState } from '../../store/store';
import { addNotification, fetchNotifications } from '../../features/notifications/slice/notificationSlice';
import { toast } from 'react-hot-toast';

export const useInitializeSocket = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?._id || (user as any)?._id;

  useEffect(() => {
    if (!userId) return;

    // Only connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('join', userId);

    // Fetch initial notifications
    dispatch(fetchNotifications({ page: 1, limit: 10 }));

    // Listen for notifications
    const handleNotification = (notification: any) => {
      dispatch(addNotification(notification));
      toast.success(notification.title || 'New Notification', {
        description: notification.message,
        icon: '🔔',
      } as any);
    };

    socket.on('notification', handleNotification);

    return () => {
      socket.off('notification', handleNotification);
      socket.disconnect();
    };
  }, [userId, dispatch]);
};
