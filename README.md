# Use Claude Code to Explore and Develop the project 

### initialize the context
/clear
/init: generate the CLAUDE.md to understand how this project works 

### specify file to the current context 
> use @src/audios/chest_open.mp3 in the @src/App.tsx to play the sound effect of the chest being opened

### add more to the context
> check the comments of existing changes

type '#' first 
"add comments on the top of every new function in one line to summarize the usage" 
> 2. Project memory

> use @src/audios/chest_open_with_evil_laugh.mp3 in the @src/App.tsx to play the sound effect of the chest with skeleton inside being opened  

> check the comments of existing changes

### use screenshot to develop intuitively 
> [!image] show the results to be either: win, tie, loss in the circled place according to the final score 

### Challenge: change the hover mouse point icon
use the src/assets/key.png icon when the mouse hovers over the closed treasure box

### manage context 
> go through the url recursively to understand everything about SQLite and add all information in the context. 
https://nodejs.org/docs/latest/api/sqlite.html                                                      

/context 
> 19k/200k tokens (12%)

/compact

/context 
> 17k/200k tokens (9%)

/clear 

/context

esc + esc > select a conversation to go back 

### Plan mode + Ultrathink: 
shift + tab 
> "Ultrathink to use SQLite to build a simple sign up and sign in flow and store the game score for each signed in user"

### custom command - check_typo 
"Slash commands in Claude Code are custom prompts stored as Markdown files that you can trigger with a simple /command-name syntax. Think of them as reusable prompt templates that encapsulate specific workflows or instructions."

create folder: .claude/commands
create file: check_typo.md

> I'm creating a new check_typo command @.claude/commands/check_typo.md . help me fill in information for checking Engligh grammar, typo, acronyms  

re-open a new claude code session

modify the /App.tsx with some typos

> /check_typo @src/App.tsx

### custom command - deploy to Github Pages 
> create a custom command called "deploy" which allows me to deploy to Github Pages.
https://uopsdod.github.io/claude_code_treasure_game/

### assets attributes
- https://freesound.org/people/steprock/sounds/771164/
- https://freesound.org/people/miksmusic/sounds/497707/?
- https://www.flaticon.com/free-icon/key_14846423?term=key&page=1&position=10&origin=tag&related_id=14846423
- https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=115095