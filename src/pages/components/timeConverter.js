
function timeConverter (current, previous){
    var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
           return Math.round(elapsed/1000) + ' sekunder sedan';
      }

      else if (elapsed < msPerHour) {
           return Math.round(elapsed/msPerMinute) + ' minuter sedan';
      }

      else if (elapsed < msPerDay ) {
           return Math.round(elapsed/msPerHour ) + ' timmar sedan';
      }

      else if (elapsed < msPerMonth) {
          return  Math.round(elapsed/msPerDay) + ' dagar sedan';
      }

      else if (elapsed < msPerYear) {
          return  Math.round(elapsed/msPerMonth) + ' månader sedan';
      }
}
module.exports = timeConverter;
