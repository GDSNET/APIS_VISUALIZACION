const funSendNotification = require('../node_fcm/index_fcm');

const http = require('http');
var request = require("request");


  const serverKey = 'AAAAdNnmwbQ:APA91bGG6dEal893J0EKrA2I6qyx-bwuLxn5U25l2G-UV4yyJxm2SFmCNxPI15HGys9vXIm_TJYPCRd4eds75Wptv5e4LYCNipDETapEOVSmn1NIVXw6gYhkzbymz3Zk9ggT08id-KYc'; 
  const referenceKey =  'cZfWicfJdUc7kyh01OQn68:APA91bFLSDWuLbHvQW-7b4NiZVWxXrIOIpZCi8TARFmtvEfiB72rV0xWIgVHtHVd7FYWUqAr7uMBrYkbJyKsIw1-exnJh8K-MjaR2gjFo9DE0w4P6rZTPEAZUfYJQ_kZm30GUA56v_is'; 
  let title = 'Vamos que se puede';
  let message = 'dale ashdahsdhasd hdhs sa';
  
  


    funSendNotification.funSendNotification(serverKey, referenceKey, title, message)
  