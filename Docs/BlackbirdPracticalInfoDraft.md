# Blackbird practical information — website copy draft

Prepared: 2026-09-09. Draft only; not yet added to public pages.

## Before you install

Blackbird brings your build, test, and publishing tools together in one desktop app. You'll still need the game engines, platform tools, and accounts required by the workflows you want to run.

Download the Windows installer to get started. The MSI is also available for administrators who need it; you only need one installer.

## Installing Blackbird

Run the installer and follow the setup steps. Installation asks for administrator approval and acceptance of the license agreement. You can choose whether to add a desktop shortcut.

Once installed, add your project and configure the tools and paths it uses. Then choose an action or reusable workflow to run.

## Keeping up to date

Blackbird can check for and install updates from within the app. Open Settings > Updates to manage updates and read release notes.

The built-in release history explains what's changed, so you can review improvements and fixes before your next session.

## Trying the alpha

Blackbird is currently in alpha. Features and workflows will continue to evolve as we improve the app. Start with a test project, review an action's settings before running it, and keep your work backed up—actions can change files and control connected devices.

## Your settings and projects

Blackbird keeps its application files separate from your settings and Package Library. Repairing or uninstalling the app preserves your user data by default.

## Questions or feedback?

Join the Incogent Discord to discuss Blackbird, or use the website contact form for product questions and support. When reporting a problem, include your Blackbird version, what you were trying to do, and any relevant error message. Remove credentials and private project information before sharing logs.

## Editorial notes — not public copy

- Placement: concise sections or an FAQ below the main Blackbird benefits, near the final download action. Keep full setup tutorials in the documentation owned by the other agent.
- Confirm minimum Windows version and architecture from the supported release configuration. Do not infer an OS support promise from the .NET target or development machine.
- Confirm RAM/disk requirements before listing numbers; distinguish the app footprint from game-engine/build requirements.
- Confirm the public build includes the described Settings > Updates > Release Notes path. No fixed version number, installer size, signing status, or release date is asserted here.
- Use existing first-party download and contact URLs. Link Discord through site configuration. Link release notes only when a public destination is selected.
- Evidence: Blackbird README.md (project setup, action execution, tools); Docs/WindowsInstallerPlan.md (installer implementation marked complete, EXE/MSI, elevation, shortcuts, preserved data); Docs/ReleasesAndUpdates.md (updates and release history). Recheck public-release parity before publishing.
