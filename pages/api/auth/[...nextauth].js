import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

const refreshToken = async (token) => {
  try {
      spotifyApi().setAccessToken(token.accessToken);
      spotifyApi().setRefreshToken(token.refreshToken);

      const { body: newToken } = await spotifyApi.refreshAccessToken();
      return {
          ...token,
          accessToken: newToken.access_token,
          accessTokenExpiry: Date.now()+newToken.expires_in*1000,
          refreshToken: newToken.refresh_token ?? token.refreshToken,
      }
  } catch(e) {
      
      console.error(e);
      return {
          ...token,
          error:"Could not refresh token",
      }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
    }),
    // ...add more providers here
  ],
  secret: 'vasea',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        console.log("First time .")
        return {
          ...token,
          userId: user.id,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          expiresIn: account.expires_at * 1000,
        }
      }
      if (Date.now() < token.expiresIn) {
        console.log("Token is still valid");
        return token;
      }

      return await refreshToken(token);
    },
    session({session, token}){
      session.user.id = token.userId;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
  }
  }

})