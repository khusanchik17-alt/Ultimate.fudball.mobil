# Porting this design to Unity (optional)

The current build uses a WebGL core for headless-CI buildability. If you prefer a
Unity project later, keep this repository's gameplay design and follow:

- **Unity version:** 2022.3 LTS with URP (mobile-friendly).
- **Mapping of modules:**
  | Web module | Unity equivalent |
  |------------|------------------|
  | `scene3d.js` stadium | URP scene, GPU-instancing for crowd (Graphics.DrawMeshInstanced) |
  | `match.js` simulation | `MonoBehaviour` FixedUpdate simulation; same AI state logic ports 1:1 |
  | `data.js` | ScriptableObjects for players/clubs |
  | `save.js` | `JsonUtility` + `PlayerPrefs`/file save |
  | `audio.js` | AudioMixer + recorded SFX instead of synthesis |
- **Android build:** Player Settings → min API 24, target 34, IL2CPP, arm64;
  Graphics APIs Vulkan/OpenGLES3; quality tiers mirror LOW/MED/HIGH presets.
- **CI:** Unity builds require a license — use GameCI (gameci/activate-unity)
  with your own UNITY_LICENSE secret, `gameci/unity-builder@v3`.

The simulation constants (speeds, AI difficulty tiers, formations) live in
`web/src/config.js` / `data.js` and transfer directly.
