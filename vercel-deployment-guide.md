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

### Basic Configuration

1. In the configuration page:
   - **Framework Preset**: Vercel should automatically detect Vue.js. If not, select "Vue.js" from the dropdown.
   - **Project Name**: You can keep the default name or choose a custom one.
   - **Root Directory**: Leave this blank as your project is at the root of the repository.
   - **Build Command**: Leave as default (`npm run build`) or set to `vite build` if needed.
   - **Output Directory**: Leave as default (`dist`).

### Environment Variable Configuration

This is a critical step for your Supabase integration:

1. Click on "Environment Variables" to expand this section.
2. Add the following variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL (the same value from your local `.env` file)
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key (the same value from your local `.env` file)

3. Click "Deploy" to start the deployment process.

## Step 4: Monitor the Deployment

1. Vercel will now build and deploy your application. You can watch the progress in real-time.
2. The build process typically takes 1-2 minutes for a Vue.js application.

## Step 5: Access Your Deployed Application

1. Once the deployment is complete, Vercel will provide you with a URL to access your application (e.g., `https://todo-app-txgo.vercel.app`).
2. Click on the URL to open your deployed todo application.

## Step 6: Configure Supabase for Production

### 6.1 Basic Authentication Configuration

1. In your Supabase dashboard, go to "Authentication" → "URL Configuration".
2. Add your Vercel deployment URL to the "Site URL" and "Redirect URLs" fields.
3. This ensures that authentication redirects work correctly in your production environment.

### 6.2 Forgot Password Function Configuration

To ensure that the forgot password function works correctly, you need to configure:

1. **Add Authentication Callback URL**:
   Ensure that the "Redirect URLs" field includes:
   ```
   https://your-app.vercel.app/auth/callback
   https://your-app.vercel.app/login
   https://your-app.vercel.app/dashboard
   ```

2. **Configure Email Template**:
   - Go to "Authentication" → "Email Templates"
   - Select the "Reset Password" template
   - Confirm that the redirect link format is: `{{ .SiteURL }}/auth/callback`

3. **Verify Email Settings**:
   - Ensure that "Authentication" → "Settings" is enabled for email confirmation
   - Configure SMTP settings (if using a custom email service)

### 6.3 Development and Production Environment Configuration

If you are developing locally, you need to add two sets of URLs:

**Development Environment**:
```
http://localhost:5173/auth/callback
http://localhost:5173/login
http://localhost:5173/dashboard
```

**Production Environment**:
```
https://your-app.vercel.app/auth/callback
https://your-app.vercel.app/login
https://your-app.vercel.app/dashboard
```

## Step 7: Test Authentication Function

After deployment, test the following:

### 7.1 Basic Authentication Test
1. Access your deployed URL
2. Try to register a new account
3. Try to log in and log out

### 7.2 Forgot Password Function Test
1. Click "Forgot Password?" on the login page
2. Enter a valid email address
3. Check the email for the reset link
4. Click the link to confirm that you can correctly navigate to the reset password page
5. Set a new password and verify login

## Step 8: Set Up Custom Domain (Optional)

1. If you want to use a custom domain:
   - Go to the "Domains" tab in your project settings.
   - Click "Add" and enter your domain name.
   - Follow the instructions to configure your DNS settings.

## Continuous Deployment

Vercel automatically sets up continuous deployment for your project. Whenever you push changes to your GitHub repository, Vercel will automatically rebuild and redeploy your application.

## Troubleshooting

### Common Issues

1. **Authentication Callback Failure**:
   - Check the "Redirect URLs" configuration in Supabase
   - Ensure that the URL is correctly spelled, including the `https://` prefix
   - Verify that the environment variables are correctly set

2. **Forgot Password Email Link Invalid**:
   - Confirm the redirect URL format in the email template
   - Check the `/auth/callback` route configuration
   - Verify the `vercel.json` file contains the correct rewrite rules

3. **404 Error**:
   - Ensure that the `vercel.json` file exists and contains SPA routing configuration
   - Check for errors in the build logs

4. **Environment Variable Issue**:
   - Verify the environment variables in the Vercel project settings
   - Ensure that the variable names start with `VITE_`
   - Redeploy to apply environment variable changes

### Debugging Steps

1. Check the build logs in Vercel for any errors
2. Verify that the environment variables are correctly set
3. Ensure that your Supabase project is properly configured for your production URL
4. Check the browser console for errors
5. Use browser developer tools to inspect network requests

## Security Considerations

1. **Environment Variable Security**:
   - Never hardcode sensitive information in code
   - Use Vercel's environment variable feature
   - Rotate API keys periodically

2. **Supabase Security**:
   - Enable row-level security (RLS)
   - Regularly review authentication settings
   - Monitor anomalous login activities

## Next Steps

Now that your todo application is deployed, you can:

1. Share the URL with others to showcase your work.
2. Continue developing new features locally and push to GitHub to automatically update your deployed application.
3. Monitor your application's performance and usage through Vercel's analytics.
4. Consider adding a custom domain to enhance professionalism.
5. Set up monitoring and error tracking services.

## Related Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Authentication Documentation](https://supabase.com/docs/guides/auth)
- [Vue.js Deployment Guide](https://vuejs.org/guide/best-practices/production-deployment.html)
- [Project GitHub Repository](https://github.com/txgo/todo)