import express, { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

interface Track {
  artist: string;
  title: string;
  id: number;
}

interface TracksData {
  tracks: Track[];
}

const tracksFilePath = './tracks.json';

app.get('/api/tracks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const tracksData: TracksData = JSON.parse(fs.readFileSync(tracksFilePath, 'utf-8'));
  const track = tracksData.tracks.find(track => track.id === Number(id));
  if (track) {
    res.json(track);
  } else {
    res.status(404).json({ error: 'Track not found' });
  }
});

app.get('/api/tracks/by-artist/:artist', (req: Request, res: Response) => {
  const { artist } = req.params;
  const tracksData: TracksData = JSON.parse(fs.readFileSync(tracksFilePath, 'utf-8'));
  const tracksByArtist = tracksData.tracks.filter(track => track.artist === artist);
  if (tracksByArtist.length > 0) {
    res.json(tracksByArtist);
  } else {
    res.status(404).json({ error: 'No tracks found for the artist' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
