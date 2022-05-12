const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds 
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display 
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    // Get the length of the outline 
    const outlineLength = outline.getTotalLength();
    // Duration 
    let fackDuration = 600;
    
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // pick Different sounds 
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    // play Sound 
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    // Select Sound 
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fackDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fackDuration / 60)}:${Math.floor(fackDuration % 60
            )}`;
        });
    });

    // create a function specific to stop and play yhe sounds 

    const checkPlaying = song => {
        if(song.paused)
        {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }
        else
        {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }
    };

    // We can animate The Circle 

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fackDuration - currentTime;
        let seconds = Math.floor(elapsed % 60); 
        let minutes = Math.floor(elapsed / 60); 
        
         // Animate the Circle 
        let progress = outlineLength - (currentTime / fackDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // Animate the text 
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fackDuration)
        {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    }

};


app();