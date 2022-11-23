class NotificationService {
  constructor() {
    this.notificationsQuery = [];
    this.Worker = new Worker(this.notificationsQuery);
  }

  addNotification(notification) {
    this.notificationsQuery.push(notification);
    this.notificationsQuery.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }
}

class Worker {
  constructor(notificationsQuery) {
    this.notificationsQuery = notificationsQuery;
  }
  run() {
    this.notificationsQuery.forEach((notification) => {});
  }
}
