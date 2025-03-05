document.addEventListener('DOMContentLoaded', function() {
    // Auto-dismiss flash messages after 1 second
    const flashMessages = document.querySelectorAll('.flash-message');
    
    if (flashMessages.length > 0) {
      setTimeout(function() {
        flashMessages.forEach(function(message) {
          // Add fade-out animation
          message.style.transition = 'opacity 0.5s ease-out';
          message.style.opacity = '0';
          
          // After the fade completes, remove the element
          setTimeout(function() {
            message.remove();
          }, 500);
        });
      }, 1000); // 1000ms = 1 second
    }
    
    // Also handle manual close button clicks
    const closeButtons = document.querySelectorAll('.flash-close');
    closeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const message = button.closest('.flash-message');
        message.style.transition = 'opacity 0.3s ease-out';
        message.style.opacity = '0';
        
        setTimeout(function() {
          message.remove();
        }, 300);
      });
    });
  });