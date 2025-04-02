# Deploying Your Todo App to Vercel

This guide will walk you through the process of deploying your Vue.js and Supabase todo application to Vercel using your GitHub repository.

## Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com/) and sign up for an account if you don't already have one.
2. You can sign up using your GitHub account for a seamless integration.

## Step 2: Import Your GitHub Repository

1. Once logged in to Vercel, click on the "Add New..." button and select "Project".
2. Connect your GitHub account if you haven't already.
3. Select the GitHub repository where you pushed your todo app (`https://github.com/txgo/todo.git`).
4. Click "Import".

## Step 3: Configure Your Project

1. In the configuration page:
   - **Framework Preset**: Vercel should automatically detect Vue.js. If not, select "Vue.js" from the dropdown.
   - **Project Name**: You can keep the default name or choose a custom one.
   - **Root Directory**: Leave this blank as your project is at the root of the repository.
   - **Build Command**: Leave as default (`npm run build`) or set to `vite build` if needed.
   - **Output Directory**: Leave as default (`dist`).

2. **Environment Variables**: This is a critical step for your Supabase integration.
   - Click on "Environment Variables" to expand this section.
   - Add the following variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL (the same value from your local `.env` file)
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key (the same value from your local `.env` file)

3. Click "Deploy" to start the deployment process.

## Step 4: Monitor the Deployment

1. Vercel will now build and deploy your application. You can watch the progress in real-time.
2. The build process typically takes 1-2 minutes for a Vue.js application.

## Step 5: Access Your Deployed Application

1. Once the deployment is complete, Vercel will provide you with a URL to access your application (e.g., `https://todo-app-txgo.vercel.app`).
2. Click on the URL to open your deployed todo application.

## Step 6: Set Up Custom Domain (Optional)

1. If you want to use a custom domain:
   - Go to the "Domains" tab in your project settings.
   - Click "Add" and enter your domain name.
   - Follow the instructions to configure your DNS settings.

## Step 7: Configure Supabase for Production

1. In your Supabase dashboard, go to "Authentication" → "URL Configuration".
2. Add your Vercel deployment URL to the "Site URL" and "Redirect URLs" fields.
3. This ensures that authentication redirects work correctly in your production environment.

## Continuous Deployment

Vercel automatically sets up continuous deployment for your project. Whenever you push changes to your GitHub repository, Vercel will automatically rebuild and redeploy your application.

## Troubleshooting

If you encounter any issues with your deployment:

1. Check the build logs in Vercel for any errors.
2. Verify that your environment variables are correctly set.
3. Ensure that your Supabase project is properly configured for your production URL.
4. Check that your browser console doesn't show any errors when accessing the deployed application.

## Next Steps

Now that your todo application is deployed, you can:

1. Share the URL with others to showcase your work.
2. Continue developing new features locally and push to GitHub to automatically update your deployed application.
3. Monitor your application's performance and usage through Vercel's analytics.