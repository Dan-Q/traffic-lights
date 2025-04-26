# Traffic Lights: React vs Web Components

## Summary

A very basic implementation of a "traffic lights" components both (a) as a React component and
(b) as a Web Component.

## Background

Some folks in my network on LinkedIn were discussing
[a post](https://www.linkedin.com/posts/avantika-raj-157ba9233_interviewpreperation-reactjs-javascript-activity-7318203906348494848-A3TM/)
that described the interview somebody went through for the position of "React Developer" with
Volkswagen Software Solutions. Reportedly, it included a "coding question" which was as follows:

> Create a traffic light component with green, yellow, and red lights. On clicking a button, the
> light should change. Initially, it should show green. After 2 minutes, it should automatically
> switch to red for 30 seconds, then yellow for 10 seconds, and repeat this cycle continuously.

### React version

I'm not seeking a React-specific nor frontend position, but React (and similar frameworks) show up
all over the place, and because I haven't written any React in almost a year I thought I'd "dust
the pipes" and check that I still know how to. Turns out that I do. The implementation in `react/`
does just that, at the most-basic level (see the limitations below).

At this point, I was reminded how... _chunky_ React components are. Even running a production build
with minified code, the bundle as-delivered to the user-agent is >200kB before compression.

### Web Components version

So I reimplemented it, exactly, as a Web Component. All vanilla JavaScript, no buildchain (I've no
objection to a build process, and complex projects often benefit from one regardless of their
stack, but one definitely wasn't needed here!)... and yet _without_ minification, the total package
was <20kB. So... significantly under a tenth the total payload size for the same functionality,
with fewer dependencies and a simpler build process.

## Learnings

I understand why React DOM exists. Componentisation on the Web is hella useful, and it's only
relatively-recently become usable as a mainstream standard (by which I mean: since 2020 if you're
only supporting evergreen browsers... I guess that's not-so-recent after all).

I understand why you'd still be recruiting React developers if you have a significant React
codebase. I've worked on codebases with lots of React, and you can't just replace it all overnight.

But it feels like React has by now gone the way of jQuery: it's a tool that provided a powerful
set of workarounds to some annoying limitations in the Web as a platform, and it's time to stop
using it for _new_ projects. And if you've got a legacy project that uses it...? Well, perhaps it's
time to put a strategy together for weaning yourself off it. It's not getting any less-obsolete,
you know!

(If you're going to come back and retort that React is more than React DOM then: yes, you're right.
But if you're depending on e.g. Routing in an age where the History API exists, you're just raising
a second problem as an argument for your first problem. The Web's moved on. It's time you moved on,
too. Also, can you stop depending on the client-side for routing? When it's done _right_ it's ugly,
and when it's done _wrong_ it's often a nightmare for usability. Just sayin'.)

There's a blog post going into further detail, at:

[https://danq.me/2025/04/26/deprecate-react/](https://danq.me/2025/04/26/deprecate-react/)

## Usage

Oh, you actually wanted to try my code? Okay. Check it out, and then:

### React version

#### Running

1. `cd react`
2. `npm install`
3. `npm start` (for development mode)
4. Or for production mode:
    1. `npm install -g serve`
    2. `npm run build`
    3. `serve build`

#### Reconfiguration

Edit `react/src/index.js` and modify:

```jsx
<TrafficLights showTimer={true} showControls={true} durations={{ green: 10 }} />
```

All parameters are optional:

- `showTimer`: shows the timer
- `showControls`: shows the controls
- `durations`: the durations of each light (in seconds); override as few or as many as you want.
  The default is `{ green: 12, red: 3, yellow: 1 }` (note that this differs by an order of
  magnitude from the brief because I didn't want to wait a long time while testing). The sequence
  (green > red > yellow) is defined in the code.

### Web Components version

#### Running

1. `cd web-components`
2. `npm install -g serve`
3. `serve`

#### Reconfiguration

Edit `web-components/index.html` and modify:

```html
<traffic-lights timer="true" controls="true">
  <traffic-lights-bulb color="red"></traffic-lights-bulb>
  <traffic-lights-bulb color="yellow"></traffic-lights-bulb>
  <traffic-lights-bulb color="green" duration="10" on="true"></traffic-lights-bulb>
</traffic-lights>
```

Parameters:

- `<traffic-lights timer="true">` shows the timer
- `<traffic-lights controls="true">` shows the controls
- `<traffic-lights-bulb color="red">` creates each light - you can have as many as you like, with
  any valid HTML color name/code: the sequence is defined by their order on the page
- `<traffic-lights-bulb duration="10">` sets the duration of that light, in seconds
- `<traffic-lights-bulb on="true">` sets the light to be "on" (lit) when the page loads; set this
  on exactly one light to begin with

## Limitations

Mostly because this wasn't actually _my_ interview and was just an excuse to check I still knew how
to React (and then later as an excuse to demonstrate how React DOM is pretty-much obsoleted by Web
Components for new projects) it doesn't include many things I'd have wanted to see were I the
recruiter who was interviewing for this position.

Also, I wanted to knock the whole thing (React and Web Components versions) out in under an hour.

In particular, things I didn't add but would have liked to (for example, if I were trying to
impress somebody into giving me a second interview or what-have-you) include:

- **Fallbacks**: JavaScript doesn't always work as you'd hope. A good web component (whatever
  technology it's implemented in) should ideally be a progressive enhancement upon the underlying
  HTML. Right now the React version just says "You need to enable JavaScript to run this app." and
  the Web Component version shows a non-interactive traffic light, so both could be much better.

- **Validation**: Neither version performs any safety-checks to ensure that the developer launching
  the component hasn't, for example, set both red and green to be lit at the same time, or set a
  negative time duration on any particular light.

- **Tests**: Off the back of that validation, some automated tests would have been nice.

- **Accessibility**: I'm not remotely happy with the accessibility of this component. Do not use it
  in any kind of real environment (I can't imagine you would).

- **Documentation**: A README's okay, but there's a real lack of code comments, especially in the
  React version.

- **Structure**: Some of these files are a bit fat and the folder structure doesn't lend itself
  well to future expansion. Y'know, in case we want level crossing lights and a pedestrian
  crossing, too.
