// script.js
document.addEventListener('DOMContentLoaded', () => {
    const svgContainer = document.getElementById('svg-container');

    fetch('eyee.svg')
        .then(response => response.text())
        .then(data => {
            svgContainer.innerHTML = data;

            const svg = document.getElementById('svg20126');

            const eye = document.getElementById('eye');
            const eyeClipPath = document.getElementById('eye-clip');
            const pupil = document.getElementById('pupil');
            const pupil_effect = document.getElementById('pupil_effect');

            // const updatePupil = (event) => {
            //     const rect = eye.getBoundingClientRect();
            //     const eyeCenterX = rect.left + rect.width / 2;
            //     const eyeCenterY = rect.top + rect.height / 2;

            //     const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);

            //     const pupilDistance = rect.width / 4; // Pupil movement radius inside the eye
            //     let pupilX = pupilDistance/4 * Math.cos(angle);
            //     let pupilY = rect.height/6 * Math.sin(angle);

            //     pupil.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);
            //     eyeClipPath.setAttribute('transform', `translate(${-pupilX}, ${-pupilY})`);
            // };

            // const updatePupil = (event) => {
            //     const rect = eye.getBoundingClientRect();
            //     const eyeCenterX = rect.left + rect.width / 2;
            //     const eyeCenterY = rect.top + rect.height / 2;
            
            //     const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
            
            //     const pupilDistance = rect.width / 4; // Pupil movement radius inside the eye
            //     let pupilX = pupilDistance / 4 * Math.cos(angle);
            //     let pupilY = rect.height / 6 * Math.sin(angle);
            
            //     const easingFactor = 0.1;
            //     const currentPupilX = parseFloat(pupil.getAttribute('data-pupil-x') || 0);
            //     const currentPupilY = parseFloat(pupil.getAttribute('data-pupil-y') || 0);
                
            //     //lerp
            //     pupilX = currentPupilX + (pupilX - currentPupilX) * easingFactor;
            //     pupilY = currentPupilY + (pupilY - currentPupilY) * easingFactor;
            
            //     pupil.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);
            //     eyeClipPath.setAttribute('transform', `translate(${-pupilX}, ${-pupilY})`);
                
            //     // Store the current pupil position for the next iteration
            //     pupil.setAttribute('data-pupil-x', pupilX);
            //     pupil.setAttribute('data-pupil-y', pupilY);
            // };

            const updatePupil = (event) => {
                const rect = eye.getBoundingClientRect();
                const eyeCenterX = rect.left + rect.width / 2;
                const eyeCenterY = rect.top + rect.height / 2;
            
                const deltaX = event.clientX - eyeCenterX;
                const deltaY = event.clientY - eyeCenterY;
                
                // Calculate the distance between cursor and eye center
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
                // Calculate a factor to scale down the movement based on distance
                const scaleFactor = Math.min(distance / (rect.width / 2), 1);
            
                const angle = Math.atan2(deltaY, deltaX);
            
                const pupilDistance = rect.width / 4; // Pupil movement radius inside the eye
                let pupilX = pupilDistance / 4 * Math.cos(angle) * scaleFactor;
                let pupilY = rect.height / 6 * Math.sin(angle) * scaleFactor;
            
                const easingFactor = 0.1;
                const currentPupilX = parseFloat(pupil.getAttribute('data-pupil-x') || 0);
                const currentPupilY = parseFloat(pupil.getAttribute('data-pupil-y') || 0);
                
                // Interpolate using lerp
                pupilX = currentPupilX + (pupilX - currentPupilX) * easingFactor;
                pupilY = currentPupilY + (pupilY - currentPupilY) * easingFactor;
            
                pupil.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);
                pupil_effect.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);
                eyeClipPath.setAttribute('transform', `translate(${-pupilX}, ${-pupilY})`);
                
                // Store the current pupil position for the next iteration
                pupil.setAttribute('data-pupil-x', pupilX);
                pupil.setAttribute('data-pupil-y', pupilY);
            };
            
            
            
            
            

            document.addEventListener('mousemove', updatePupil);
        });
});
