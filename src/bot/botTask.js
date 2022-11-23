const PeriodChecker = require("../parser/PeriodChecker");

const botTasksCast = async () => {
  const period = PeriodChecker();
};

module.exports = botTasksCast;

// server notification task service

const NotificationService = require("../services/notificationService");

const notificationService = new NotificationService();

module.exports = notificationService;
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 */
