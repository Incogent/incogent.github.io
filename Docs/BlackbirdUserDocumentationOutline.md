# Blackbird user documentation outline

Content inventory for the user-authorized full documentation draft, not a claim that every
listed capability has shipped. All 57 guides are now drafted as navigable website pages.
Canonical content: `i18n/docs/en.json`; maintenance: [documentation guide](BlackbirdDocumentationMaintenance.md).
Verify each guide against the release it documents before publication. This is a content inventory;
the Blackbird User Documentation and Onboarding Plan remains the execution plan.

## Website navigation

Use the eight proposed sections below, including a dedicated Action authoring section. Use expandable groups for their articles and an “On this page” list
inside each article. The home-page presentation is undecided. The previously suggested three entry paths have not
been approved; settle the landing-page design separately from the article structure.

Search should cover article titles and text once the documentation grows. Breadcrumbs, stable
section anchors, and related-guide links should make direct links from the app useful. Only show
published articles as navigable destinations; do not send users to empty “coming soon” pages.

## 1. Getting started

| Article | What the reader can do afterward | Suggested media |
|---|---|---|
| Install and activate Blackbird | Choose an installer, finish setup, select packages, and activate their license | Setup package-selection screenshot; activation screenshot with synthetic values |
| Your first Action | Run System Information and understand the result, without needing a project or device | Short MP4 from search to completion |
| Add your first project | Add/select a project and find its project-specific settings | Project setup screenshots |
| Find your way around | Recognize Actions, Projects, Settings, the device selector, Queue, Output, and History | One annotated window screenshot |

Keep the initial path short. Link to device setup and publishing only when needed. Reuse the
System Information walkthrough from the Actions guide rather than maintaining two versions.

## 2. Everyday use

| Article | What it covers | Suggested media |
|---|---|---|
| Find and run Actions | Search, tags, Bundle/Creator filters, favorites, pinned views, grouping, Run versus Queue | Existing draft's screenshots and short search/run clip |
| Projects and settings | Switching projects; how installed Actions define the settings Blackbird displays; app, project, and per-run values; reusable named options and profiles | Annotated settings examples showing their scope |
| Devices | This PC versus a remote device, scanning, selection, and compatibility | Device-selector screenshot |
| Work with the queue | Add, configure, reorder, remove, start, pause, and stop queued work; interpret the outcome | Short reorder/start clip; queue result screenshot |
| Save and reuse Workflows | Save a sequence, load it later, review its settings, and run it | Save/load screenshots |
| Schedule work | Choose what runs and when, understand prerequisites, inspect results, and change/cancel a schedule | Schedule editor and status screenshots |
| Results, Output, and History | Understand completion dialogs, inspect past runs, find logs, and collect useful diagnostics | Failure dialog and History screenshots |

Define an Action, queue, Workflow, and schedule briefly where introduced. Avoid a separate
glossary that users must read before they can perform a task. Explain timing and stop/pause
behavior precisely when authoring those guides, based on actual supported behavior.

## 3. Set up your tools

| Article | What it covers | Suggested media |
|---|---|---|
| Android setup | Install/configure ADB, enable required device access, connect, and verify discovery | Relevant Blackbird settings and detected-device screenshots |
| SteamOS setup | Configure the supported connection, verify discovery, and explain credentials | Connection settings with synthetic values |
| Unreal Engine setup | Required tools and project paths for the supported Actions | Project settings screenshot |
| Unity setup | Required tools, project configuration, and applicable build profiles | Project settings screenshot |
| Godot setup | Editor/project paths and export prerequisites | Project settings screenshot |

Do not duplicate vendor installation manuals. Link to official instructions, then document
exactly what Blackbird needs and how to verify setup. Check vendor links and supported versions
before publication. Explain Steam Frame/Android distinctions according to existing behavior;
do not document the previously discussed device redesign as implemented.

## 4. Complete a task

| Guide | Intended outcome | Suggested media |
|---|---|---|
| Build a project | Follow separate Unreal, Unity, or Godot instructions and locate the output | Settings screenshot and completion screenshot per engine |
| Deploy and launch on Android | Select a build/device, deploy, launch, and verify | Short successful sequence clip |
| Install and launch on SteamOS | Prepare the target, install the build, and launch it | Profile screenshot and result screenshot |
| Collect logs | Choose the appropriate project/device log Action and find the saved files | Result screenshot with output location |
| Update a project version | Configure the supported version format and optional VCS revision input | Version-format example using synthetic values |
| Upload a build | Select a publishing profile, validate without uploading, upload, and verify success | Profile, validation result, and completion screenshots |

Start each with the outcome, prerequisites, and expected output. Link back to setup articles;
do not repeat tool installation in every walkthrough. Keep engine-specific paths explicit.

Under **Upload a build**, provide focused provider setup pages for Steam, Meta Quest/Rift, PICO,
STOVE, Viveport, and Custom CLI as supported. Cover the official tool source, account access,
IDs/credentials, executable path, validation, and common errors. Introduce these through the
upload guide instead of giving every provider its own top-level navigation item.

## 5. Packages and customization

| Article | What it covers | Suggested media |
|---|---|---|
| Manage packages | Bundles versus packages; select, install, update, remove, read release notes, and Undo | Selection/review/result screenshots |
| Manage your library | Find its location, distinguish Change Location from Move Library, and work with local content | Library-location controls screenshot |
| Create and edit an Action | Choose a starting point, configure requirements/settings/execution, save, and test | Wizard screenshots and a short save/test clip |
| Create a shared library or discovery provider | Explain when each is useful and document the supported creation flow | One example for each wizard |
| Share and import configuration | Explain the supported export/import workflow, what is included, and what stays local | Export/import review screenshots |

Keep local package editing separate from installing published packages. Custom-bundle publishing,
community registries, and maintainer checkout refresh do not belong in ordinary user instructions
unless and until they are supported public workflows. Do not expose internal catalog/transaction
machinery as steps users are expected to manage.

## 6. Troubleshooting

Provide a symptom-based index pointing to focused answers:

- An Action is missing or cannot run.
- A required setting, executable, or dependency is missing.
- A device is not discovered or cannot connect.
- A build, deployment, or upload failed.
- A package install/update/remove operation failed.
- A scheduled run did not start or did not complete.
- Blackbird will not start, or activation fails.
- How to report a problem and include the relevant log.

Each answer should state what to check, the concrete correction, the expected result, and when
to seek help. Prefer links to the relevant setup guide over repeating it. Add error screenshots
only when recognizing that exact screen is useful. Never suggest deleting library/configuration
files as a generic first step.

## 7. Create your own Actions

This is a first-class authoring guide, not a short appendix or a manifest dump. Serve users who can
write a script but do not yet understand how Blackbird supplies its inputs. Introduce the concepts
through the wizard first, then connect each UI choice to the manifest and running script.

| Article | Required explanation and example | Suggested media |
|---|---|---|
| From script to Action | Create an Action, choose its requirements and execution runner, locate its files, edit the script, reload, and test | Wizard-to-editor-to-result clip |
| How Blackbird settings work | Actions declare the inputs they need; Blackbird presents and stores values; scripts request the resolved inputs | Declaration → settings UI → script diagram |
| Define your own settings | Namespace/key, label, type, scope, required/default values, choices, paths, secrets, and validation | Custom-setting editor annotated with resulting canonical ID |
| Share settings across Actions | Reuse a defined shared namespace/key; distinguish shared identity from matching labels; match the existing definition | Two Actions reading one project setting |
| Read values in your script | Import the runtime, obtain context, read parameters, handle types and optional values, and access project/device information | Small copyable script with adjacent explanations |
| Reusable options and profiles | Named options versus grouped profiles, conditions, arrays, and what is selected at run/queue time | One worked configuration showing the selected resolved value |
| Write and debug the script | Supported runners, external tools, arguments/quoting, paths, output, cancellation, success/failure results, secrets, and iterative testing | Useful failure followed by corrected successful run |
| Reuse code with libraries | Create/export functions, declare dependencies and supported interfaces, import through the runtime, and separate code reuse from shared settings | Minimal library consumed by two Actions |
| Create a discovery provider | Provider input/output contract, starter script, validation, refresh, and diagnosis | Provider result appearing in the device selector |

### The concept to teach explicitly

A Blackbird setting definition is not a script variable. The Action declares the setting in its
package manifest (the wizard writes this for the author). Blackbird gathers its value from the
appropriate project, application, or run context and passes the resolved value into execution.
The script reads it through the runtime and may assign it to an ordinary local script variable.

Use one consistent synthetic example throughout the authoring guides:

```json
{
  "id": "example.outputDirectory",
  "label": "Output directory",
  "type": "folder",
  "scope": "project",
  "required": true
}
```

```powershell
$OutputDirectory = Get-BlackbirdParameter -Name "example.outputDirectory" -Required
```

This is a setting fragment and a runtime-read excerpt, not a complete runnable Action. The full
tutorial must include the runtime import, unhandled-failure trap, and completion result. Explain
that `$OutputDirectory` is a PowerShell variable; `example.outputDirectory` is Blackbird's setting
identity. Assigning a different value to the local variable does not update another Action's
settings. A shared setting is not an automatic channel for passing one Action's output to the next.

Two Actions declaring the same compatible shared ID can read the same saved value. For example,
one Action reads a project output directory to produce files and another reads it to inspect those
files. They do not need duplicate settings or a copied directory value. The selected project
determines which project-scoped value they receive.

The guide must distinguish:

- **Identity:** the exact `namespace.key`, not the friendly label. Different IDs do not share values.
- **Scope:** project, application, or run. Reusing a run-scoped ID does not create a globally saved
  value; run confirmation and remembered suggestions are different from persistent configuration.
- **Compatibility:** matching IDs require compatible definitions, including scope, type, value mode,
  choices, and path constraints. Reuse an existing definition through the editor rather than inventing
  a conflicting one. Explain the correction when Blackbird reports a conflict.
- **This Action:** an Action-specific namespace derived from its package ID. Use a shared namespace
  for settings deliberately intended for reuse; do not teach users to borrow another Action's private
  namespace. A namespace does not by itself determine persistence scope.
- **Profiles:** selections group related settings; profiles are not a general cross-Action value store.
  Explain their Action/project ownership and keep unrelated shared facts outside an Action's profile.
- **Runtime context:** project/device metadata, declared settings, environment variables, and ordinary
  language variables have different roles. Document their supported access mechanisms explicitly;
  do not tell scripts to locate and parse Blackbird's settings files directly.

### Worked learning sequence

Build one small Action that reports a configured output directory. Add a project-scoped setting,
read it in PowerShell, and show a structured result. Then create a second Action that reuses the
same setting and show how changing the project value affects both on subsequent runs. Finally,
introduce a run-only choice and a shared helper function, making the difference between value
sharing and code sharing visible.

Provide complete downloadable examples once verified. Include expected UI and output, where each
file belongs, how to reload after edits, and diagnoses for a missing value, misspelled ID, conflicting
definition, missing runtime/library, and a script exception. Explain queued configuration snapshots
so users do not assume editing a setting rewrites already queued work.

The basic shared-settings explanation also belongs in **Projects and settings** for users who never
write scripts. Link that introduction to this authoring sequence rather than duplicating all details.
Use PowerShell for the first worked example; document other supported runners separately with their
actual access contracts. Do not imply PowerShell syntax works in every runner.

## 8. Reference

Keep concise lookup material separate from tutorials:

- Keyboard shortcuts and mouse navigation.
- App preferences: appearance, startup panels, notifications, updates, and privacy.
- Command-line use for supported automation.
- Exact setting types, manifest fields, runtime functions, and library requirements, linked from the authoring tutorials.
- App updates versus package updates, with links to published release notes.

Do not publish developer plans, internal publishing instructions, private Actions, or source-code
architecture as user reference. Advanced authoring details belong here only where users need them.

## Suggested initial coverage for review

For a usable first publication, prioritize getting started, Actions, project/settings scope,
device setup for the reader's platform, queue/Workflows, package management, and basic troubleshooting.
Include the introductory authoring and shared-settings guides early: an existing user already needs
this explanation. Then fill out specialist workflows, scheduling, providers, and advanced reference. This is a proposed
content priority, not a change to the approved development/release sequence.

## Page and media pattern

Use a short outcome statement, only relevant prerequisites, numbered steps, expected result, a
small troubleshooting section, and related links. Reference pages can use tables instead of steps.
Show the Blackbird version the instructions were verified against; keep editorial review notes out
of published copy. User-facing instructions must work without playing a video.

- Use screenshots for layouts, settings, and results; mark each proposed image with what it teaches.
- Use short MP4 clips for interactions whose sequence matters, with a poster, playback controls,
  and no required autoplay. Add captions/transcripts when narration carries information.
- Prefer one clear visual per explanation over screenshots of every click. Give images meaningful
  alt text and optional full-size viewing when UI text would otherwise be too small.
- Use public builds and synthetic projects/devices/accounts. Exclude private Actions, credentials,
  personal paths, and unrelated desktop content.

The general structure has user support; the home-page design remains undecided. The next useful
review is the authoring learning sequence and proposed initial coverage. Approval of
this outline would guide subsequent writing; it does not authorize publishing unfinished pages.
