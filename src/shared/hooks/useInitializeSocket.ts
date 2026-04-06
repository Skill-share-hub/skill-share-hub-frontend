import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../services/socket';
import type { RootState } from '../../store/store';
import { addNotification, fetchNotifications } from '../../features/notifications/slice/notificationSlice';
import { toast } from 'react-hot-toast';

export const useInitializeSocket = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const userId = user?.id || (user as any)?._id;
    if (userId) {
      // Connect and join personal room
      socket.connect();
      socket.emit('join', userId);
      
      // Fetch initial notifications
      dispatch(fetchNotifications({ page: 1, limit: 10 }));

      // Listen for notifications
      socket.on('notification', (notification) => {
        dispatch(addNotification(notification));
        
        // Show toast
        toast.success(notification.title || 'New Notification', {
          description: notification.message,
          icon: '🔔',
        } as any);
      });

      return () => {
        socket.off('notification');
        socket.disconnect();
      };
    }
  }, [user, dispatch]);
};
