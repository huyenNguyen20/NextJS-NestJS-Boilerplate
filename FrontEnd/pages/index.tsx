import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import withAuth from '../lib/withAuth';

function Index() {
  return (
    <div>
      <Grid
        container
        spacing={3}
        justify="center"
        style={{ paddingTop: '40px', paddingBottom: '40px' }}
      >
        <Grid item sx={12} md={6}>
          <Card>
            <CardActionArea>
              <CardMedia>
                <img
                  style={{ width: '100%', height: 'auto' }}
                  src="http://localhost:3000/images/hero.jpg"
                  alt="Homepage"
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Welcome to NestJS - NestJS Boilerplate
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  You are welcome to use it as a template for web apps using NextJS - NestJS stacks
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="secondary">
                Github Repo
              </Button>
              <Button size="small" color="secondary">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default  withAuth(Index);
