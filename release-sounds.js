// Release sound notification system
// Plays different sounds based on version bump type

const { exec } = require('child_process');

class ReleaseSounds {
  constructor() {
    this.sounds = {
      patch: 'system:complete',
      minor: 'system:notification',
      major: 'system:alert',
      none: 'system:exit'
    };
  }

  playSound(versionType) {
    const sound = this.sounds[versionType] || this.sounds.none;
    
    try {
      // Windows sound command
      if (process.platform === 'win32') {
        exec(`powershell -c "(New-Object Media.SoundPlayer '${sound}').PlaySync();"`);
      } 
      // macOS sound command
      else if (process.platform === 'darwin') {
        exec(`afplay /System/Library/Sounds/${sound}.aiff 2>/dev/null || say '${versionType} version released'`);
      } 
      // Linux sound command
      else {
        exec(`paplay /usr/share/sounds/${sound}.wav 2>/dev/null || echo '${versionType} version released'`);
      }
    } catch (error) {
      console.log(`🔊 ${versionType.toUpperCase()} VERSION RELEASED!`);
    }
  }

  announceVersion(oldVersion, newVersion) {
    const versionType = this.getVersionType(oldVersion, newVersion);
    const message = this.getVersionMessage(versionType, oldVersion, newVersion);
    
    console.log(`\n🎉 ${message}\n`);
    this.playSound(versionType);
    
    return { versionType, message };
  }

  getVersionType(oldVersion, newVersion) {
    const oldParts = oldVersion.split('.').map(Number);
    const newParts = newVersion.split('.').map(Number);
    
    // Major bump
    if (newParts[0] > oldParts[0]) {
      return 'major';
    }
    // Minor bump
    if (newParts[1] > oldParts[1]) {
      return 'minor';
    }
    // Patch bump
    if (newParts[2] > oldParts[2]) {
      return 'patch';
    }
    
    return 'none';
  }

  getVersionMessage(type, oldVersion, newVersion) {
    const messages = {
      major: `🚨 MAJOR VERSION BUMP! ${oldVersion} → ${newVersion}`,
      minor: `✨ MINOR VERSION UPDATE: ${oldVersion} → ${newVersion}`,
      patch: `🐛 PATCH VERSION FIX: ${oldVersion} → ${newVersion}`,
      none: `📝 VERSION UPDATED: ${oldVersion} → ${newVersion}`
    };
    
    return messages[type] || messages.none;
  }
}

// Export for use in release scripts
module.exports = ReleaseSounds;

// Example usage:
// const sounds = new ReleaseSounds();
// sounds.announceVersion('2.15.0', '4.0.0');
