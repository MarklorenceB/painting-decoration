// Reference implementation for web/src/app/page.tsx
// Adapt the ACF fields, types, and styling to match the user's project.
// This example assumes a "Page Hero" field group with heroH1, intro, and heroImage fields.

import { fetchGraphQL } from '@/lib/graphql';
import { GET_ALL_PAGES, GET_GENERAL_SETTINGS } from '@/lib/queries';
import { PagesResponse } from '@/types/wordpress';

interface GeneralSettings {
  generalSettings: {
    title: string;
    description: string;
    url: string;
  };
}

export default async function Home() {
  try {
    const [pagesData, settingsData] = await Promise.all([
      fetchGraphQL<PagesResponse>(GET_ALL_PAGES),
      fetchGraphQL<GeneralSettings>(GET_GENERAL_SETTINGS),
    ]);

    const pages = pagesData.pages.nodes;
    const settings = settingsData.generalSettings;

    return (
      <main className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {settings.title}
            </h1>
            <p className="text-xl text-gray-600">
              {settings.description || 'Headless WordPress + Next.js'}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Connected to WordPress</span>
            </div>
          </header>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Pages from WordPress
            </h2>

            {pages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No pages found. Create your first page in WordPress!</p>
                <a
                  href={settings.url + '/wp-admin/post-new.php?post_type=page'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Create a Page
                </a>
              </div>
            ) : (
              <div className="space-y-6">
                {pages.map((page) => (
                  <article
                    key={page.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {page.title}
                    </h3>

                    {/* ACF Fields — adapt to your field group */}
                    {page.pageHero && (
                      <div className="mt-4 space-y-3">
                        {page.pageHero.heroH1 && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-blue-600 uppercase mb-1">
                              Hero Heading (ACF)
                            </p>
                            <p className="text-lg text-gray-900">
                              {page.pageHero.heroH1}
                            </p>
                          </div>
                        )}
                        {page.pageHero.intro && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-purple-600 uppercase mb-1">
                              Introduction (ACF)
                            </p>
                            <div
                              className="prose text-gray-700"
                              dangerouslySetInnerHTML={{ __html: page.pageHero.intro }}
                            />
                          </div>
                        )}
                        {page.pageHero.heroImage && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-gray-600 uppercase mb-2">
                              Hero Image (ACF)
                            </p>
                            {/* Consider using next/image for production */}
                            <img
                              src={page.pageHero.heroImage.sourceUrl}
                              alt={page.pageHero.heroImage.altText || page.title}
                              className="rounded-lg max-w-full h-auto"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Yoast SEO Metadata */}
                    {page.seo && (
                      <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-yellow-700 uppercase mb-2">
                          SEO Metadata (Yoast)
                        </p>
                        <dl className="grid grid-cols-1 gap-2 text-sm">
                          {page.seo.title && (
                            <div>
                              <dt className="font-medium text-gray-700">SEO Title:</dt>
                              <dd className="text-gray-600">{page.seo.title}</dd>
                            </div>
                          )}
                          {page.seo.metaDesc && (
                            <div>
                              <dt className="font-medium text-gray-700">Meta Description:</dt>
                              <dd className="text-gray-600">{page.seo.metaDesc}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    )}

                    <div className="mt-4 text-sm text-gray-500">
                      Slug: <code className="bg-gray-100 px-2 py-1 rounded">{page.slug}</code>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 text-center space-x-4">
            <a
              href={settings.url + '/wp-admin'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            >
              WordPress Admin
            </a>
            <a
              href={settings.url + '/graphql'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              GraphQL Endpoint
            </a>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen p-8 bg-red-50">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Connection Error</h1>
          <p className="text-gray-700 mb-4">
            Unable to connect to WordPress GraphQL endpoint.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {error instanceof Error ? error.message : 'Unknown error'}
          </pre>
          <div className="mt-6">
            <h2 className="font-bold text-gray-900 mb-2">Troubleshooting:</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Check that WordPress Docker containers are running</li>
              <li>Verify WP_GRAPHQL_URL in .env.local is correct</li>
              <li>Ensure WPGraphQL plugin is activated</li>
              <li>Confirm permalinks are set to "Post name"</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
