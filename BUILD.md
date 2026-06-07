# PassForge — Native Build Guide

## Prerequisites

### Web (development)
- Node.js 20+

### Windows Desktop (Tauri)
- [Rust](https://rustup.rs/) — `winget install Rustlang.Rustup`
- **Then run:** `rustup default stable` (required after first rustup install!)
- [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) with **Desktop development with C++**
- Node.js 20+

**Quick setup script (PowerShell):**
```powershell
.\scripts\setup-windows.ps1
```

**Common errors:**

| Error | Fix |
|-------|-----|
| `no default is configured` | `rustup default stable` |
| `linker link.exe not found` | Install VS Build Tools with C++ workload (see below) |

**Install C++ Build Tools:**
```powershell
winget install Microsoft.VisualStudio.2022.BuildTools --override "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
```
Restart terminal after install, then run `npm run tauri:build` again.

### Android (Capacitor)
- [Android Studio](https://developer.android.com/studio)
- Android SDK (API 34+)
- Java JDK 21+ (required by Capacitor 7)
- Node.js 20+

### GitHub Actions (no local Android Studio / Rust needed)

Workflow: `.github/workflows/build-native.yml` (**Release Native Apps**)

Runs only when:
- You push a **tag** (`v1.0.0`, `v1.0.1`, …)
- You change **`package.json`** version on `main`
- You trigger manually: **Actions → Release Native Apps → Run workflow**

Creates a **GitHub Release** with:
- Windows NSIS installer (`.exe`) + MSI
- Android APK (`PassForge-{version}-debug.apk`)

**Recommended release flow:**
```bash
# 1. Bump version in package.json (e.g. 1.0.0 → 1.0.1)
# 2. Commit and tag
git add package.json
git commit -m "chore: release v1.0.1"
git tag v1.0.1
git push origin main --tags
```

---

## Web Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Windows Desktop (Tauri)

```bash
# Install Rust first (one-time)
winget install Rustlang.Rustup
# Restart terminal, then:
rustup default stable

# Install deps & init Tauri (first time only)
npm install
npm run tauri:dev      # Development with hot reload
npm run tauri:build    # Production .exe / .msi
```

**Output:** `src-tauri/target/release/bundle/`

| Format | Path |
|--------|------|
| NSIS installer (recommended) | `bundle/nsis/PassForge_0.1.0_x64-setup.exe` |
| MSI installer | `bundle/msi/PassForge_0.1.0_x64_en-US.msi` |
| Portable exe | `target/release/app.exe` |

---

## Android (Capacitor)

```bash
npm install
npm run cap:android          # Build web assets + sync to Android
npm run cap:open:android     # Open in Android Studio
```

In Android Studio:
1. Wait for Gradle sync
2. Select a device/emulator
3. Click **Run** (▶)

**Output APK:** `android/app/build/outputs/apk/`

### Debug APK via command line

```bash
cd android
./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/PassForge-{version}-debug.apk
```

---

## Build Modes

| Command | Target | Base path |
|---------|--------|-----------|
| `npm run build` | GitHub Pages | `/PassForge/` |
| `npm run build:native` | Tauri / Capacitor | `./` (relative) |
| `npm run dev` | Local dev | `/` |
