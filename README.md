
# SkyPass Manager

An easy and safe to use password manager

<a href="https://github.com/SkylerHope">
  <img src="https://img.shields.io/badge/GitHub-gray?style=plastic&logo=github" alt="GitHub" />
</a>
<a href="https://mastodon.social/@Skyler_Sh">
  <img src="https://img.shields.io/badge/Mastodon-blueviolet?style=plastic&logo=mastodon" alt="Mastodon" />
</a>
<a href="https://twitter.com/SkylerHopeSh">
  <img src="https://img.shields.io/badge/Twitter-blue?style=plastic&logo=x" alt="Twitter" />
</a>
<a href="https://dev.to/skylerhope">
  <img src="https://img.shields.io/badge/Dev-black?style=plastic&logo=dev.to&logoColor=white" alt="Dev" />
</a>

## Guides and tips

- ### Reset your PIN

Close the app, open the terminal and type:

```bash
  find / config.enc | grep skypass-manager/config.enc
```
When the highlighted path appears, press CTRL+C and then type:

```bash
  rm /path-to-directory/skypass-manager/config.enc
```

**WARNING: Don't touch the path that includes the *.config* directory**

Launch the app



- ### Run the app more safely

Hide (or completely remove) the app from your applications menu

Open the terminal and type:

```bash
  nano ~/.bashrc
```
At the end of the file, create a unique alias that only YOU should know. For example:

```bash
  alias donuts='flatpak run com.SkylerHope.SkypassManager'
```

Save(CTRL+S), then close the nano editor(CTRL+X) and type:

```bash
  source ~/.bashrc
```

Run the app through the terminal with the alias that you just created:

```bash
  donuts
```

*Now you can always run the app just by typing the alias*