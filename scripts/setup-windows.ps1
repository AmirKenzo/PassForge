# PassForge — Windows build prerequisites
# Run in PowerShell: .\scripts\setup-windows.ps1

Write-Host "=== PassForge Windows Setup ===" -ForegroundColor Cyan

# 1. Rust toolchain
if (Get-Command rustup -ErrorAction SilentlyContinue) {
    Write-Host "[OK] rustup found" -ForegroundColor Green
    rustup default stable
    rustc --version
} else {
    Write-Host "[!] rustup not in PATH. Install:" -ForegroundColor Yellow
    Write-Host "    winget install Rustlang.Rustup" -ForegroundColor Yellow
    Write-Host "    Then RESTART terminal and run: rustup default stable" -ForegroundColor Yellow
}

# 2. MSVC linker check
$link = Get-Command link.exe -ErrorAction SilentlyContinue
if ($link) {
    Write-Host "[OK] MSVC linker found: $($link.Source)" -ForegroundColor Green
} else {
    Write-Host "[!] link.exe not found. Install Visual Studio Build Tools:" -ForegroundColor Yellow
    Write-Host '    winget install Microsoft.VisualStudio.2022.BuildTools --override "--wait --passive --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"' -ForegroundColor Yellow
    Write-Host "    Then RESTART terminal." -ForegroundColor Yellow
}

# 3. Node
if (Get-Command node -ErrorAction SilentlyContinue) {
    Write-Host "[OK] Node.js $(node --version)" -ForegroundColor Green
} else {
    Write-Host "[!] Node.js not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "After prerequisites are installed:" -ForegroundColor Cyan
Write-Host "  npm run tauri:dev    # test desktop app" -ForegroundColor White
Write-Host "  npm run tauri:build  # build .exe installer" -ForegroundColor White
