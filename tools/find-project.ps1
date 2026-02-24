powershell -ExecutionPolicy Bypass -File .\tools\find-project.ps1
# If the helper prints a path, run:
Set-Location -LiteralPath 'PASTE_PATH_HERE'<#
Search common user folders for the project folder named "Vision-AI-Studio", copy path to clipboard
and optionally open a new PowerShell window at the project root.

Usage:
  - Open PowerShell anywhere and run:
      powershell -ExecutionPolicy Bypass -File .\tools\find-project.ps1

This script only searches a few common locations (USERPROFILE, Documents, Desktop, Downloads,
OneDrive, Projects) and limits recursion for speed. If your repo is in a custom location, cd there manually.
#>

$projectName = 'Vision-AI-Studio'
$docs = Join-Path $env:USERPROFILE 'Documents'
$desktop = Join-Path $env:USERPROFILE 'Desktop'
$downloads = Join-Path $env:USERPROFILE 'Downloads'
$onedrive = Join-Path $env:USERPROFILE 'OneDrive'
$projects = Join-Path $env:USERPROFILE 'Projects'

$searchRoots = @(
    $env:USERPROFILE,
    $docs,
    $desktop,
    $downloads,
    $onedrive,
    $projects
)

$found = $null
foreach ($root in $searchRoots) {
    if (-not (Test-Path $root)) { continue }
    Write-Host "Searching in: $root" -ForegroundColor DarkGray
    try {
        # Search directories up to 3 levels deep to avoid long scans
        $dirs = Get-ChildItem -Path $root -Directory -ErrorAction SilentlyContinue -Recurse -Depth 3 | Where-Object { $_.Name -eq $projectName }
        if ($dirs -and $dirs.Count -gt 0) {
            $found = $dirs[0].FullName
            break
        }
    } catch {
        # ignore permission errors and continue
    }
}

if ($found) {
    Write-Host "`nProject found:" -ForegroundColor Green
    Write-Host $found -ForegroundColor Yellow
    try { Set-Clipboard $found } catch {}
    Write-Host "(Path copied to clipboard)" -ForegroundColor DarkCyan

    $resp = Read-Host "Open new PowerShell window at project root now? (Y/n)"
    if ($resp -eq '' -or $resp -match '^[Yy]') {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location -LiteralPath '$found'"
        Write-Host "New PowerShell window opened at project root." -ForegroundColor Green
    } else {
        Write-Host "You can now run:`n    cd '$found'`nthen run the install/start commands from the README." -ForegroundColor Cyan
    }
} else {
    Write-Host "Project folder '$projectName' not found in standard locations." -ForegroundColor Red
    Write-Host "If you cloned the repo to a custom location, cd there manually or run a full search:" -ForegroundColor Cyan
    Write-Host "Get-ChildItem -Directory -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq '$projectName' }" -ForegroundColor Yellow
}
