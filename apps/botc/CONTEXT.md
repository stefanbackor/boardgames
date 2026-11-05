# Blood on the Clocktower script tool

A tool for loading a Blood on the Clocktower script, editing it, and handing it to players as a printed or PDF character sheet and night order.

## Language

### Scripts

**Script**:
An ordered list of characters chosen for a game, plus optional script metadata, in the official script tool's JSON format.
_Avoid_: edition, setup

**Script metadata**:
The `_meta` entry of a script: its name, author and Bootlegger rules.
_Avoid_: meta object, header

**Custom character**:
A character defined in full inside the script rather than looked up in the official character list.
_Avoid_: homebrew role, unofficial role

**Bootlegger rules**:
Homebrew rules written into the script metadata and printed on the Bootlegger card.
_Avoid_: homebrew rules (as a separate concept), custom rules

**Jinx**:
An official rule that changes how two specific characters interact when both are on the script.

### Flow

**Script intake**:
Turning untrusted input (pasted text, a file, an encoded link, a remote URL) into a script with validated script metadata, or rejecting it with a reason.
_Avoid_: import, parsing (when the whole flow is meant)

**Original script**:
The script as it was last loaded or saved, against which unsaved edits are measured.
_Avoid_: base script, source script

**Script view**:
The script as players see it: name, author, the character pages grouped by team with their jinx and Bootlegger annotations, and the night sheets. The screen, print and PDF all show the same script view.
_Avoid_: rendered script, layout
