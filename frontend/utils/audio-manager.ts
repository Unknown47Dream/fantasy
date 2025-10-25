/* eslint-disable @typescript-eslint/no-explicit-any */

export class AudioManager {
  private sounds: Record<string, HTMLAudioElement> = {};
  private gameSounds: Record<string, HTMLAudioElement> = {};
  private currentMergeSound: HTMLAudioElement | null = null;
  private audioFormat: string;
  private basePath = "/game-assets/game-audio";
  private enabled: boolean = true;
  private initialized: boolean = false;

  constructor() {
    this.audioFormat = this.detectAudioSupport();
  }

  detectAudioSupport(): string {
    const audio = new Audio();
    if (audio.canPlayType('audio/ogg; codecs="vorbis"')) {
      return "ogg";
    }
    return "mp3";
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    // Stop current sounds if disabling
    if (!enabled && this.currentMergeSound) {
      this.currentMergeSound.pause();
      this.currentMergeSound.currentTime = 0;
      this.currentMergeSound = null;
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  async loadSounds(animalData: any[]) {
    if (this.initialized) return;

    try {
      // Load animal sounds
      const animalLoadPromises = animalData.map((animal) => {
        return new Promise<void>((resolve) => {
          const audio = new Audio();
          audio.src = `${this.basePath}/${this.audioFormat}/${animal.name}.${this.audioFormat}`;
          audio.volume = 0.5;
          audio.preload = "auto";

          audio.addEventListener(
            "canplaythrough",
            () => {
              this.sounds[animal.name] = audio;
              resolve();
            },
            { once: true }
          );

          audio.addEventListener(
            "error",
            () => {
              console.warn(`Failed to load sound for ${animal.name}`);
              resolve();
            },
            { once: true }
          );

          audio.load();
        });
      });

      // Load game sounds
      const gameSoundNames = ["drop1", "drop2", "drop3", "bubble-pop", "click"];
      const gameSoundPromises = gameSoundNames.map((soundName) => {
        return new Promise<void>((resolve) => {
          const audio = new Audio();
          audio.src = `${this.basePath}/${this.audioFormat}/${soundName}.${this.audioFormat}`;
          audio.volume = 0.4;

          audio.addEventListener(
            "canplaythrough",
            () => {
              this.gameSounds[soundName] = audio;
              resolve();
            },
            { once: true }
          );

          audio.addEventListener(
            "error",
            () => {
              console.warn(`Failed to load game sound: ${soundName}`);
              resolve();
            },
            { once: true }
          );

          audio.load();
        });
      });

      await Promise.all([...animalLoadPromises, ...gameSoundPromises]);
      this.initialized = true;
      console.log(
        `Loaded ${Object.keys(this.sounds).length} animal sounds and ${
          Object.keys(this.gameSounds).length
        } game sounds`
      );
    } catch (error) {
      console.error("Failed to load sounds:", error);
    }
  }

  playMergeSound(animalName: string) {
    if (!this.enabled) return;

    // Stop currently playing merge sound if any
    if (this.currentMergeSound) {
      this.currentMergeSound.pause();
      this.currentMergeSound.currentTime = 0;
    }

    if (this.sounds[animalName]) {
      const sound = this.sounds[animalName].cloneNode() as HTMLAudioElement;
      sound.volume = 0.5;

      sound.play().catch((e) => {
        console.log("Audio play failed:", e);
      });

      this.currentMergeSound = sound;

      sound.addEventListener("ended", () => {
        if (this.currentMergeSound === sound) {
          this.currentMergeSound = null;
        }
      });
    }
  }

  playDropSound() {
    if (!this.enabled) return;

    // Randomly select one of the three drop sounds
    const dropSoundIndex = Math.floor(Math.random() * 3) + 1;
    const dropSoundName = `drop${dropSoundIndex}`;

    if (this.gameSounds[dropSoundName]) {
      const sound = this.gameSounds[dropSoundName].cloneNode() as HTMLAudioElement;
      sound.volume = 0.3;
      sound.play().catch((e) => {
        console.log("Drop sound play failed:", e);
      });
    }
  }

  playBubblePopSound() {
    if (!this.enabled) return;

    if (this.gameSounds["bubble-pop"]) {
      const sound = this.gameSounds["bubble-pop"].cloneNode() as HTMLAudioElement;
      sound.volume = 0.4;
      sound.play().catch((e) => {
        console.log("Bubble pop sound play failed:", e);
      });
    }
  }

  playClickSound() {
    if (!this.enabled) return;

    if (this.gameSounds["click"]) {
      const sound = this.gameSounds["click"].cloneNode() as HTMLAudioElement;
      sound.volume = 0.5;
      sound.play().catch((e) => {
        console.log("Click sound play failed:", e);
      });
    }
  }

  cleanup() {
    if (this.currentMergeSound) {
      this.currentMergeSound.pause();
      this.currentMergeSound = null;
    }
  }
}
