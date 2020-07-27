    var webPush = require('web-push');
     
    const vapidKeys = {
       "publicKey": "BCnzGO-4vJhpRGw1pCjRT9JSEx6byd-Eiw3A9eKVXj5I1LRD29HGE2Rc2313Iuvfo6VIVteslfBRAjuVYm_5Zxk",
       "privateKey": "9ygdFFmwSpOsZhyDcw_RO40WmGMz6PyUYEH_R3lAjdQ"
    };
     
     
    webPush.setVapidDetails(
       'mailto:agy.nugroho@gmail.com',
       vapidKeys.publicKey,
       vapidKeys.privateKey
    )
    var pushSubscription = {
       "endpoint": "https://fcm.googleapis.com/fcm/send/d-lUuPEfHV0:APA91bGocNHsA0hT_Il3lo5xFFXgbK_Hc9a1uD0Sl54bpcfMPZNXJATk_D_zn4M-Y0rcnofBB8vkK9sGwbd75GaRqMispGLhTEM9WezVnJL5BjnHRK7yWek6gr5UL71_qB4RHS0IKd2Y",
       "keys": {
           "p256dh": "BPV56HvXU2CIzBZ7YdfPNBUkNbsQtUSzCzBss850N4vKCxrESzgSuMQCBU3uZYQ5amdW62bFb7iqzBSMnYji0/8=",
           "auth": "GbCbIo582sM7EHE5WTLPhQ=="
       }
    };
    var payload = 'Jadwal tim Bundesliga akan bermain besok! Lihat Jadwalnya! Jangan lupa dukung tim kesayangan Bundesliga kesayangan kalian ya!!!';
     
    var options = {
       gcmAPIKey: '951543307485',
       TTL: 60
    };
    webPush.sendNotification(
       pushSubscription,
       payload,
       options
    );