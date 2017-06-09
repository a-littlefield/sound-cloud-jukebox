$(document).ready(function () {
	
	let jukebox = new Jukebox();
	console.log(jukebox.songs);
	$(document).on('click', '#playPauseButton', function () {
		let playing = $(this).attr('data-playing');
		if (playing === 'true'){
			jukebox.pauseSong();
			$(this).attr('data-playing', false);
			$(this).text('Play');
		}else{
			jukebox.playSong();
			$(this).attr('data-playing', true);
			$(this).text('Pause');
			$('#artist').html('<a target="_blank" href=' + jukebox.songs[jukebox.currentSongIndex].user.permalink_url + '>' + jukebox.songs[jukebox.currentSongIndex].user.permalink + '</a>')
			$('#names').html('<a target="_blank" href=' + jukebox.songs[jukebox.currentSongIndex].permalink_url + '>' + jukebox.songs[jukebox.currentSongIndex].id + '</a>');
			$('#photo').html('<img src=' + jukebox.songs[jukebox.currentSongIndex].artwork_url + '>');
			$('#desc').html(jukebox.songs[jukebox.currentSongIndex].description + '<br></br>' + jukebox.songs[jukebox.currentSongIndex].genre + '<br></br>' + jukebox.songs[jukebox.currentSongIndex].created_at);
		};
		
	});
	
	// $('#search').keyup(function () {
	// 	let nameSongs = $(this).val();
	// });





	//$(document).on('click', 'music', function () {
		
	//})
	//data-song-id=""
});


function Jukebox() {
	let self = this;
	this.currentSongIndex = 1;
	this.currentSong = null;
	this.currentTrack = null;
	this.songs = [];
	SC.initialize({
		client_id: 'tPgHTQ7j2u7N6yq6l4x3MaM6BZq1Qujq'
	});

	SC.get('/tracks',{
		q: 'linkin park'
	}).then(function(tracks) {
		 self.songs = tracks;
		 console.log(tracks);
		 self.currentSong = self.songs[self.currentSongIndex];
		 self.currentTrack = SC.stream('/tracks/' + self.currentSong.id);
		 console.log(self);
	});//end get
				

	this.music = [];
	this.loadSongs = function (addSong) {
		this.music.push(addSong);
	};
	this.songChange = function (newSong) {
		//this.song.src = ;
		//this.song.load();
	}
	this.listMusic = function (songTitle) {
		let musicArray = [];
		for (var i = 0; i < this.songs.length; i++) {
			musicArray[i] = this.songs[i];
		}
		return musicArray;
	}//end listMusic
	this.playSong = function(){
		self.currentTrack.then(function (player) {
		  	player.play();
		  	//when song finishes print this to console.
		  	player.on('finish', function(){
		  		console.log('Noyce')
	  		});
	  	});
	};//end playSong

	this.pauseSong = function () {
		self.currentTrack.then(function (player) {
			player.pause();
		})
	}

	this.stop = function(){
		// self.playSong.player.pause();
		// self.playSong.player.currentTime = 0;
	};

};//end Jukebox

function Song(location, songName, artist) {
	this.locaiton = location;
	this.songName = songName;
	this.artist = artist;
	this.songInfo = function () {
		return this.songName + ' by ' + this.artist;
	}
};






// Choose file (song) form drop down to add to jukebox and play through play button.
// document.getElementById('changeSong').addEventListener('change', function () {
// 	jukebox.songChange(this.value.split('\\').pop());

// })