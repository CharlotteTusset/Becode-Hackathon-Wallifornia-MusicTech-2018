//
// document.getElementById("upload_widget_opener").addEventListener("click", function() {
//   cloudinary.openUploadWidget({ cloud_name: 'imacoustic-live', upload_preset: 'vivbxf4w'},
//     function(error, result) {
//       const tags = result[0].tags;
//       const public_id = result[0].public_id;
//       const thumbnail = result[0].thumbnail_url;
//
//       document.getElementById("thumbnail").src = thumbnail;
//       document.getElementById("tag").innerHTML = tags[0];
//
//       console.log(error, result);
//     });
// }, false);

const lastfm_api = '591eb9d40511433f1eaec7ec16fc690e';
const youtube_api = 'AIzaSyB-DHXUr356lo_RXTT1_GAdPgszhMNMP58';

function getArtistLFMName(str) {
  let name = str;
  return new Promise((resolve, reject) => {
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=' + name + '&api_key='+ lastfm_api +'&format=json')
    .done(data => {
      if(data.results.artistmatches.artist[0]) resolve(data.results.artistmatches.artist[0].name);
      else reject("No artist with that name (failed step 1)");
    })
    .fail(() => reject("Failed to get artist name (step 1)"));
  });
}

function getArtistLFMTopTrack(str) {
  let artist = str;
  return new Promise((resolve, reject) => {
    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=' + artist + '&api_key='+ lastfm_api +'&format=json')
    .done(data => {
      if(data.toptracks && data.toptracks.track[0]) resolve(data.toptracks.track[0].name);
      else reject("Couldn't find top track for this artist (step 2)");
    })
    .fail(() => reject("Failed to fetch top track (failed step 2)"));
  });
}

function getYoutubeVideoId(artist, song) {
  let searchString = artist + ' ' + song;
  return new Promise((resolve, reject) => {
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=id&q=' + searchString  +'&type=video&key=' + youtube_api)
    .done(data => {
      if(data.items & data.items[0]) resolve(data.items[0].id.videoId);
      else reject("No video found (step 3)");
    })
    .fail(() => reject("Failed to fetch videos (failed step 3)"));
  });
}


// getArtistLFMTopTrack("dkfhds")
// .then(data => console.log(data))
// .catch(error => console.log(error));
//





initiate = () => {

  cloudinary.openUploadWidget({ cloud_name: 'imacoustic-live', upload_preset: 'rsoc7avm'},
    function(error, result) {

      console.log(result);

        let image = result[0];
        let public_id = image.public_id;
        let topTag = image.tags[0];
        let thumbnail = image.thumbnail_url;
        let tags = image.tags;

        for(i in result) {
          let nbfaces = result[i].info.detection.aws_rek_face.data.celebrity_faces.length;

          console.log(nbfaces);

          if(nbfaces === 1) {
            console.log("Found one face");
          }
          else if(nbfaces > 1) {
            console.log("Found more than one face");
          }
          else {
            console.log("Found no faces");
          }
        }

      });

};
